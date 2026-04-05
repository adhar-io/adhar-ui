/**
 * Push Adhar UI tokens to Penpot library colors.
 *
 * Converts a ThemePreset to DTCG, then to Penpot color entries
 * organized by semantic groups (primary, secondary, accent, etc.).
 *
 * @module
 */

import type { ThemePreset } from '@adhar-ui/tokens';
import type { PenpotColor } from '@adhar-ui/dtcg';
import { dtcgToPenpot, themeToDtcg } from '@adhar-ui/dtcg';

/**
 * Convert a ThemePreset to Penpot library color entries.
 *
 * @param preset - Adhar UI theme preset
 * @param mode - Which mode to push ('light' or 'dark')
 * @returns Array of Penpot color entries for the library
 */
export function tokenPush(
  preset: ThemePreset,
  mode: 'light' | 'dark' = 'light',
): PenpotColor[] {
  const dtcg = themeToDtcg(preset);
  return dtcgToPenpot(dtcg, mode);
}
