/**
 * Pull Figma Variables and convert to Adhar UI ThemePreset.
 *
 * Reads the Figma Variables API response, converts through DTCG,
 * and produces a ThemePreset that can be written to a preset file.
 *
 * @module
 */

import type { ThemePreset } from '@adhar-ui/tokens';
import type { FigmaVariable, FigmaVariableCollection } from '@adhar-ui/dtcg';
import { dtcgToTheme, figmaToDtcg } from '@adhar-ui/dtcg';

/**
 * Convert Figma Variables to an Adhar UI ThemePreset.
 *
 * @param collection - Figma variable collection
 * @param variables - Map of variable ID → FigmaVariable
 * @param presetName - Name for the generated preset
 * @param presetLabel - Label for the generated preset
 * @returns Adhar UI ThemePreset
 */
export function tokenPull(
  collection: FigmaVariableCollection,
  variables: Record<string, FigmaVariable>,
  presetName = 'figma-import',
  presetLabel = 'Figma Import',
): ThemePreset {
  // Step 1: Figma Variables → DTCG
  const dtcg = figmaToDtcg(collection, variables);

  // Step 2: DTCG → ThemePreset
  const theme = dtcgToTheme(dtcg, presetName, presetLabel);

  return theme;
}
