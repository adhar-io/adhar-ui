/**
 * Push Adhar UI tokens to Figma Variables.
 *
 * Converts a ThemePreset to DTCG, then to Figma Variables API payload,
 * and creates/updates the "Adhar UI" variable collection with
 * Light and Dark modes.
 *
 * @module
 */

import type { ThemePreset } from '@adhar-ui/tokens';
import { themeToDtcg } from '@adhar-ui/dtcg';
import { dtcgToFigma, type FigmaVariablesPayload } from '@adhar-ui/dtcg';

/**
 * Convert a ThemePreset to a Figma Variables API payload.
 *
 * This can be used either:
 *  - From the plugin main thread (via plugin API)
 *  - From the sync server (via REST API POST)
 *
 * @param preset - Adhar UI theme preset
 * @param collectionName - Figma variable collection name
 * @param existingCollectionId - Optional ID for updating existing collection
 * @returns Figma Variables API payload
 */
export function tokenPush(
  preset: ThemePreset,
  collectionName = 'Adhar UI',
  existingCollectionId?: string,
): FigmaVariablesPayload {
  // Step 1: Convert ThemePreset → DTCG
  const dtcg = themeToDtcg(preset);

  // Step 2: Convert DTCG → Figma Variables payload
  const payload = dtcgToFigma(dtcg, collectionName, existingCollectionId);

  return payload;
}
