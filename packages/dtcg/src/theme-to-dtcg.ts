/**
 * Convert Adhar UI ThemePreset → W3C DTCG JSON.
 *
 * This is the primary export path: code tokens → standard format.
 * The DTCG output can then be consumed by Figma, Penpot, Style Dictionary,
 * or any other DTCG-compatible tool.
 *
 * @module
 */

import type { ColorToken, SidebarTokens, ThemeColors, ThemePreset } from '@adhar-ui/tokens';
import type { DTCGDocument, DTCGGroup, DTCGToken } from './types.ts';
import { hslTripletToHex } from './color-utils.ts';

/**
 * Convert a ThemePreset to a DTCG JSON document.
 *
 * @param preset - Adhar UI theme preset (e.g. zinc, blue)
 * @returns DTCG-compliant JSON document
 *
 * @example
 * ```ts
 * import { zinc } from '@adhar-ui/tokens'
 * import { themeToDtcg } from '@adhar-ui/dtcg'
 *
 * const dtcg = themeToDtcg(zinc)
 * // Write to tokens.json for interchange
 * ```
 */
export function themeToDtcg(preset: ThemePreset): DTCGDocument {
  return {
    'adhar-ui': {
      $description: `Adhar UI design tokens – ${preset.label} preset`,
      color: {
        $description: 'Semantic color tokens',
        ...convertColors(preset.light.colors, 'light', preset.dark.colors),
      },
      radius: makeToken('dimension', preset.light.radius, preset.light.radius, {
        darkValue: preset.dark.radius,
      }),
    },
  };
}

/**
 * Convert ThemeColors (light + dark) to DTCG color group.
 * Each token stores the light value as $value and dark value in extensions.
 */
function convertColors(
  light: ThemeColors,
  _mode: string,
  dark: ThemeColors,
): DTCGGroup {
  const group: DTCGGroup = {};

  // Simple string tokens (background, foreground, border, input, ring)
  for (const key of ['background', 'foreground', 'border', 'input', 'ring'] as const) {
    group[key] = makeColorToken(
      light[key] as string,
      dark[key] as string,
    );
  }

  // ColorToken pairs (card, popover, primary, secondary, muted, accent, destructive)
  for (
    const key of [
      'card',
      'popover',
      'primary',
      'secondary',
      'muted',
      'accent',
      'destructive',
    ] as const
  ) {
    const lightToken = light[key] as ColorToken;
    const darkToken = dark[key] as ColorToken;
    group[key] = {
      DEFAULT: makeColorToken(lightToken.DEFAULT, darkToken.DEFAULT),
      foreground: makeColorToken(lightToken.foreground, darkToken.foreground),
    };
  }

  // Sidebar tokens (nested group)
  group['sidebar'] = convertSidebarTokens(light.sidebar, dark.sidebar);

  return group;
}

/**
 * Convert sidebar tokens to DTCG group.
 */
function convertSidebarTokens(light: SidebarTokens, dark: SidebarTokens): DTCGGroup {
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
  const group: DTCGGroup = {};
  for (const key of keys) {
    group[key] = makeColorToken(
      light[key as keyof SidebarTokens],
      dark[key as keyof SidebarTokens],
    );
  }
  return group;
}

/**
 * Create a DTCG color token with HSL preservation.
 */
function makeColorToken(lightHsl: string, darkHsl: string): DTCGToken {
  return {
    $type: 'color',
    $value: hslTripletToHex(lightHsl),
    $extensions: {
      'com.adhar-ui': {
        hslRaw: lightHsl,
        mode: 'light',
      },
      'com.adhar-ui.dark': {
        hslRaw: darkHsl,
        hex: hslTripletToHex(darkHsl),
      },
    },
  };
}

/**
 * Create a generic DTCG token.
 */
function makeToken(
  type: DTCGToken['$type'],
  value: string | number,
  _hslRaw: string,
  opts?: { darkValue?: string | number },
): DTCGToken {
  const token: DTCGToken = {
    $type: type,
    $value: value,
  };
  if (opts?.darkValue && opts.darkValue !== value) {
    token.$extensions = {
      'com.adhar-ui.dark': { value: opts.darkValue },
    };
  }
  return token;
}
