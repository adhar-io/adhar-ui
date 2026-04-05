/**
 * Convert Penpot library colors → DTCG JSON.
 *
 * Reads Penpot's color asset format and transforms to W3C DTCG.
 * Penpot colors are organized by path (e.g., "primary/DEFAULT")
 * which maps to the DTCG group hierarchy.
 *
 * @module
 */

import type { DTCGDocument, DTCGGroup, DTCGToken, PenpotColor } from './types.ts';
import { hexToHslTriplet } from './color-utils.ts';

/**
 * Convert Penpot library colors to a DTCG document.
 *
 * @param colors - Array of Penpot color assets
 * @param presetName - Name for the generated preset
 * @returns DTCG document
 *
 * @example
 * ```ts
 * const colors = await penpotApi.getLibraryColors(fileId)
 * const dtcg = penpotToDtcg(colors, 'custom')
 * ```
 */
export function penpotToDtcg(
  colors: PenpotColor[],
  presetName = 'penpot',
): DTCGDocument {
  const colorGroup: DTCGGroup = {
    $description: `Imported from Penpot – ${presetName}`,
  };

  // Group colors by their path
  // Penpot naming convention: "primary/DEFAULT", "primary/foreground", "background"
  for (const color of colors) {
    const path = color.path ? `${color.path}/${color.name}` : color.name;
    const parts = path.split('/');

    const token: DTCGToken = {
      $type: 'color',
      $value: color.color,
      $extensions: {
        'com.adhar-ui': {
          hslRaw: hexToHslTriplet(color.color),
        },
        'com.penpot': {
          id: color.id,
          opacity: color.opacity,
        },
      },
    };

    // Set at nested path
    let current: DTCGGroup = colorGroup;
    for (let i = 0; i < parts.length - 1; i++) {
      const segment = parts[i];
      if (
        !current[segment] || typeof current[segment] !== 'object' ||
        '$type' in (current[segment] as Record<string, unknown>)
      ) {
        current[segment] = {} as DTCGGroup;
      }
      current = current[segment] as DTCGGroup;
    }
    current[parts[parts.length - 1]] = token;
  }

  return {
    'adhar-ui': {
      $description: `Penpot color library – ${presetName}`,
      color: colorGroup,
    },
  };
}
