/**
 * Convert DTCG JSON → Figma Variables API payload.
 *
 * Produces the request body for POST /v1/variables/{fileKey}
 * to create or update Figma variable collections and variables.
 *
 * @module
 */

import type { DTCGDocument, DTCGGroup, DTCGToken, FigmaRGBA } from './types.ts';
import { hexToFigmaRGBA } from './color-utils.ts';

/** Figma Variables API request body for bulk create/update. */
export interface FigmaVariablesPayload {
  variableCollections: FigmaCollectionAction[];
  variableModes: FigmaModeAction[];
  variables: FigmaVariableAction[];
  variableModeValues: FigmaModeValueAction[];
}

interface FigmaCollectionAction {
  action: 'CREATE' | 'UPDATE';
  id?: string;
  name: string;
  initialModeId?: string;
}

interface FigmaModeAction {
  action: 'CREATE' | 'UPDATE';
  id?: string;
  name: string;
  variableCollectionId: string;
}

interface FigmaVariableAction {
  action: 'CREATE' | 'UPDATE';
  id?: string;
  name: string;
  variableCollectionId: string;
  resolvedType: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN';
}

interface FigmaModeValueAction {
  variableId: string;
  modeId: string;
  value: FigmaRGBA | number | string | boolean;
}

/**
 * Convert a DTCG document to a Figma Variables API payload.
 *
 * @param doc - DTCG document
 * @param collectionName - Name for the variable collection (default: "Adhar UI")
 * @param existingCollectionId - ID if updating an existing collection
 * @returns Payload for POST /v1/variables/{fileKey}
 */
export function dtcgToFigma(
  doc: DTCGDocument,
  collectionName = 'Adhar UI',
  existingCollectionId?: string,
): FigmaVariablesPayload {
  const collectionId = existingCollectionId ?? `temp_collection_${Date.now()}`;
  const lightModeId = `temp_mode_light_${Date.now()}`;
  const darkModeId = `temp_mode_dark_${Date.now()}`;

  const payload: FigmaVariablesPayload = {
    variableCollections: [{
      action: existingCollectionId ? 'UPDATE' : 'CREATE',
      id: collectionId,
      name: collectionName,
    }],
    variableModes: [
      { action: 'CREATE', id: lightModeId, name: 'Light', variableCollectionId: collectionId },
      { action: 'CREATE', id: darkModeId, name: 'Dark', variableCollectionId: collectionId },
    ],
    variables: [],
    variableModeValues: [],
  };

  // Walk the DTCG document and create variables
  const root = doc['adhar-ui'];
  walkGroup(root, [], payload, collectionId, lightModeId, darkModeId);

  return payload;
}

/**
 * Recursively walk a DTCG group and add variables to the payload.
 */
function walkGroup(
  group: DTCGGroup,
  path: string[],
  payload: FigmaVariablesPayload,
  collectionId: string,
  lightModeId: string,
  darkModeId: string,
): void {
  for (const [key, value] of Object.entries(group)) {
    // Skip DTCG metadata keys
    if (key.startsWith('$')) continue;

    const currentPath = [...path, key];

    if (isDTCGToken(value)) {
      const token = value as DTCGToken;
      const varName = currentPath.join('/');
      const varId = `temp_var_${varName.replace(/\//g, '_')}_${Date.now()}`;

      if (token.$type === 'color') {
        // Create color variable
        payload.variables.push({
          action: 'CREATE',
          id: varId,
          name: varName,
          variableCollectionId: collectionId,
          resolvedType: 'COLOR',
        });

        // Light mode value
        const lightRgba = hexToFigmaRGBA(token.$value as string);
        payload.variableModeValues.push({
          variableId: varId,
          modeId: lightModeId,
          value: lightRgba,
        });

        // Dark mode value (from extensions)
        const darkExt = token.$extensions?.['com.adhar-ui.dark'] as
          | Record<string, unknown>
          | undefined;
        if (darkExt?.hex) {
          payload.variableModeValues.push({
            variableId: varId,
            modeId: darkModeId,
            value: hexToFigmaRGBA(darkExt.hex as string),
          });
        }
      } else if (token.$type === 'dimension' || token.$type === 'number') {
        // Create float variable for dimensions
        const numValue = typeof token.$value === 'number'
          ? token.$value
          : parseFloat(String(token.$value));

        if (!isNaN(numValue)) {
          payload.variables.push({
            action: 'CREATE',
            id: varId,
            name: varName,
            variableCollectionId: collectionId,
            resolvedType: 'FLOAT',
          });
          payload.variableModeValues.push({
            variableId: varId,
            modeId: lightModeId,
            value: numValue,
          });
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      // Recurse into nested group
      walkGroup(value as DTCGGroup, currentPath, payload, collectionId, lightModeId, darkModeId);
    }
  }
}

/**
 * Check if a value is a DTCG token (has $type and $value).
 */
function isDTCGToken(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;
  return '$type' in obj && '$value' in obj;
}
