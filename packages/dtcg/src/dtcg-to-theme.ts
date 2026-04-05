/**
 * Convert W3C DTCG JSON → Adhar UI ThemePreset.
 *
 * This is the primary import path: design tool tokens → code tokens.
 * Reads DTCG JSON (from Figma, Penpot, or file) and produces
 * a ThemePreset that can be written to a preset file.
 *
 * Prioritizes the `$extensions["com.adhar-ui"].hslRaw` field for lossless
 * round-trips. Falls back to hex→HSL conversion when extensions are absent
 * (e.g., tokens created directly in the design tool).
 *
 * @module
 */

import type { ColorToken, SidebarTokens, ThemeColors, ThemePreset } from '@adhar-ui/tokens';
import type { DTCGDocument, DTCGGroup, DTCGToken } from './types.ts';
import { hexToHslTriplet } from './color-utils.ts';

/**
 * Convert a DTCG document to a ThemePreset.
 *
 * @param doc - DTCG JSON document
 * @param name - Preset name (e.g. "zinc")
 * @param label - Preset label (e.g. "Zinc")
 * @returns Adhar UI ThemePreset
 */
export function dtcgToTheme(doc: DTCGDocument, name: string, label: string): ThemePreset {
  const root = doc['adhar-ui'];
  const colorGroup = root['color'] as DTCGGroup;

  // Extract radius
  const radiusToken = root['radius'] as DTCGToken | undefined;
  const lightRadius = (radiusToken?.$value as string) ?? '0.5rem';
  const darkRadius = (
    radiusToken?.$extensions?.['com.adhar-ui.dark'] as Record<string, unknown> | undefined
  )?.['value'] as string ?? lightRadius;

  return {
    name,
    label,
    light: {
      colors: extractColors(colorGroup, 'light'),
      radius: lightRadius,
    },
    dark: {
      colors: extractColors(colorGroup, 'dark'),
      radius: darkRadius,
    },
  };
}

/**
 * Extract ThemeColors for a specific mode from DTCG color group.
 */
function extractColors(group: DTCGGroup, mode: 'light' | 'dark'): ThemeColors {
  return {
    background: extractSimpleColor(group['background'] as DTCGToken, mode),
    foreground: extractSimpleColor(group['foreground'] as DTCGToken, mode),
    card: extractColorToken(group['card'] as DTCGGroup, mode),
    popover: extractColorToken(group['popover'] as DTCGGroup, mode),
    primary: extractColorToken(group['primary'] as DTCGGroup, mode),
    secondary: extractColorToken(group['secondary'] as DTCGGroup, mode),
    muted: extractColorToken(group['muted'] as DTCGGroup, mode),
    accent: extractColorToken(group['accent'] as DTCGGroup, mode),
    destructive: extractColorToken(group['destructive'] as DTCGGroup, mode),
    border: extractSimpleColor(group['border'] as DTCGToken, mode),
    input: extractSimpleColor(group['input'] as DTCGToken, mode),
    ring: extractSimpleColor(group['ring'] as DTCGToken, mode),
    sidebar: extractSidebarTokens(group['sidebar'] as DTCGGroup, mode),
  };
}

/**
 * Extract a simple (non-paired) color value from a DTCG token.
 * Uses hslRaw extension if available, otherwise converts from hex.
 */
function extractSimpleColor(token: DTCGToken, mode: 'light' | 'dark'): string {
  if (mode === 'dark') {
    // Try dark-mode extension first
    const darkExt = token.$extensions?.['com.adhar-ui.dark'] as Record<string, unknown> | undefined;
    if (darkExt?.['hslRaw']) return darkExt['hslRaw'] as string;
    if (darkExt?.['hex']) return hexToHslTriplet(darkExt['hex'] as string);
  }

  // Light mode: use primary extension
  const ext = token.$extensions?.['com.adhar-ui'];
  if (ext?.hslRaw) return ext.hslRaw;

  // Fallback: convert from hex $value
  return hexToHslTriplet(token.$value as string);
}

/**
 * Extract a ColorToken (DEFAULT + foreground) from a DTCG group.
 */
function extractColorToken(group: DTCGGroup, mode: 'light' | 'dark'): ColorToken {
  return {
    DEFAULT: extractSimpleColor(group['DEFAULT'] as DTCGToken, mode),
    foreground: extractSimpleColor(group['foreground'] as DTCGToken, mode),
  };
}

/**
 * Extract sidebar tokens from a DTCG group.
 */
function extractSidebarTokens(group: DTCGGroup, mode: 'light' | 'dark'): SidebarTokens {
  const keys = [
    'background',
    'foreground',
    'primary',
    'primary-foreground',
    'accent',
    'accent-foreground',
    'border',
    'ring',
  ] as const;
  const result: Record<string, string> = {};
  for (const key of keys) {
    result[key] = extractSimpleColor(group[key] as DTCGToken, mode);
  }
  return result as unknown as SidebarTokens;
}
