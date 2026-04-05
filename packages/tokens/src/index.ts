/**
 * @adhar-ui/tokens
 *
 * Design tokens for the Adhar UI design system.
 * This package is the single source of truth for all visual properties:
 * colors, spacing, typography, animations, and breakpoints.
 *
 * Tokens are consumed by:
 *  - @adhar-ui/tailwind-preset (Tailwind CSS theme)
 *  - @adhar-ui/primitives (CVA component variants)
 *  - @adhar-ui/cli (theme generation)
 *  - End-user CSS via generated custom properties
 *
 * @example
 * ```ts
 * import { zinc, generateCSS, breakpoints } from '@adhar-ui/tokens'
 *
 * // Generate CSS custom properties for a theme preset
 * const css = generateCSS(zinc)
 *
 * // Access breakpoint values
 * console.log(breakpoints.md) // '768px'
 * ```
 *
 * @module
 */

// ─── Type Definitions ─────────────────────────────────────────────────
export type {
  AdharUIConfig,
  Breakpoint,
  BreakpointConfig,
  ColorToken,
  SidebarTokens,
  ThemeColors,
  ThemePreset,
  ThemeTokens,
} from './types.ts';

// ─── Core Token Values ────────────────────────────────────────────────
export { breakpoints, breakpointValues } from './breakpoints.ts';
export { spacing, typography } from './spacing.ts';
export { animation, keyframes } from './animations.ts';

// ─── Theme Utilities ──────────────────────────────────────────────────
export { defineTheme, generateCSS } from './css-generator.ts';

// ─── Built-in Theme Presets ───────────────────────────────────────────
export { zinc } from './presets/zinc.ts';
export { slate } from './presets/slate.ts';
export { blue } from './presets/blue.ts';
export { green } from './presets/green.ts';
