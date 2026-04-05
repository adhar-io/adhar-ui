/**
 * Convert Figma Variables API response → DTCG JSON.
 *
 * Reads the Figma REST API response for local variables and transforms
 * them into W3C DTCG format. Handles the Figma-specific RGBA color
 * format and multi-mode variable structure.
 *
 * @module
 */

import type {
  DTCGDocument,
  DTCGGroup,
  DTCGToken,
  FigmaRGBA,
  FigmaVariable,
  FigmaVariableCollection,
} from './types.ts';
import { figmaRGBAToHex, figmaRGBAToHslTriplet } from './color-utils.ts';

/**
 * Convert Figma variables response to DTCG document.
 *
 * @param collection - The Figma variable collection (e.g., "Adhar UI")
 * @param variables - Map of variable ID → FigmaVariable
 * @returns DTCG document
 */
export function figmaToDtcg(
  collection: FigmaVariableCollection,
  variables: Record<string, FigmaVariable>,
): DTCGDocument {
  // Identify light and dark mode IDs
  const lightMode = collection.modes.find(
    (m) => m.name.toLowerCase() === 'light' || m.name.toLowerCase() === 'default',
  );
  const darkMode = collection.modes.find(
    (m) => m.name.toLowerCase() === 'dark',
  );

  const colorGroup: DTCGGroup = {};

  for (const varId of collection.variableIds) {
    const variable = variables[varId];
    if (!variable) continue;

    // Parse variable name path (e.g., "color/primary/DEFAULT")
    const pathParts = variable.name.split('/');
    const tokenName = pathParts[pathParts.length - 1];
    const groupPath = pathParts.slice(0, -1);

    // Get light and dark values
    const lightValue = lightMode ? variable.valuesByMode[lightMode.modeId] : undefined;
    const darkValue = darkMode ? variable.valuesByMode[darkMode.modeId] : undefined;

    // Create DTCG token based on type
    let token: DTCGToken;

    if (
      variable.resolvedType === 'COLOR' && typeof lightValue === 'object' && lightValue !== null
    ) {
      const rgba = lightValue as FigmaRGBA;
      const darkRgba = darkValue as FigmaRGBA | undefined;

      token = {
        $type: 'color',
        $value: figmaRGBAToHex(rgba),
        $extensions: {
          'com.adhar-ui': {
            hslRaw: figmaRGBAToHslTriplet(rgba),
            mode: 'light',
          },
          ...(darkRgba
            ? {
              'com.adhar-ui.dark': {
                hslRaw: figmaRGBAToHslTriplet(darkRgba),
                hex: figmaRGBAToHex(darkRgba),
              },
            }
            : {}),
        },
      };
    } else if (variable.resolvedType === 'FLOAT') {
      token = {
        $type: 'number',
        $value: lightValue as number,
      };
    } else {
      token = {
        $type: 'dimension',
        $value: String(lightValue),
      };
    }

    // Place token in the correct group path
    setNestedToken(colorGroup, groupPath, tokenName, token);
  }

  return {
    'adhar-ui': {
      $description: `Imported from Figma collection "${collection.name}"`,
      ...colorGroup,
    },
  };
}

/**
 * Set a token at a nested path within a DTCG group.
 */
function setNestedToken(
  root: DTCGGroup,
  path: string[],
  key: string,
  token: DTCGToken,
): void {
  let current = root;
  for (const segment of path) {
    if (!current[segment] || typeof current[segment] === 'string') {
      current[segment] = {} as DTCGGroup;
    }
    current = current[segment] as DTCGGroup;
  }
  current[key] = token;
}
