/**
 * Pull Penpot library colors and convert to Adhar UI ThemePreset.
 *
 * @module
 */

import type { ThemePreset } from '@adhar-ui/tokens';
import type { PenpotColor } from '@adhar-ui/dtcg';
import { dtcgToTheme, penpotToDtcg } from '@adhar-ui/dtcg';

/**
 * Convert Penpot library colors to an Adhar UI ThemePreset.
 *
 * @param colors - Penpot color library entries
 * @param presetName - Name for the generated preset
 * @param presetLabel - Display label
 * @returns ThemePreset
 */
export function tokenPull(
  colors: PenpotColor[],
  presetName = 'penpot-import',
  presetLabel = 'Penpot Import',
): ThemePreset {
  const dtcg = penpotToDtcg(colors, presetName);
  return dtcgToTheme(dtcg, presetName, presetLabel);
}
