/**
 * Type definitions for Adhar UI design tokens.
 *
 * These types define the shape of theme presets, color tokens,
 * breakpoints, and configuration used across the design system.
 * All color values are stored as HSL triplets (e.g. "240 5.9% 10%")
 * without the `hsl()` wrapper, allowing alpha-value composition
 * in Tailwind CSS via `hsl(var(--primary) / <alpha-value>)`.
 *
 * @module
 */

/** A color token with a default value and its foreground contrast pair. */
export interface ColorToken {
  /** HSL value for the color itself (e.g. "240 5.9% 10%") */
  DEFAULT: string;
  /** HSL value for text/icons rendered on top of this color */
  foreground: string;
}

/** Sidebar-specific color tokens for navigation sidebars. */
export interface SidebarTokens {
  background: string;
  foreground: string;
  primary: string;
  'primary-foreground': string;
  accent: string;
  'accent-foreground': string;
  border: string;
  ring: string;
}

/**
 * Complete set of semantic color tokens for a theme mode (light or dark).
 * These map directly to CSS custom properties (e.g. --primary, --background).
 */
export interface ThemeColors {
  background: string;
  foreground: string;
  card: ColorToken;
  popover: ColorToken;
  primary: ColorToken;
  secondary: ColorToken;
  muted: ColorToken;
  accent: ColorToken;
  destructive: ColorToken;
  border: string;
  input: string;
  ring: string;
  sidebar: SidebarTokens;
}

/** A complete set of tokens for one mode (light or dark). */
export interface ThemeTokens {
  colors: ThemeColors;
  /** Border radius base value (e.g. "0.5rem") */
  radius: string;
}

/**
 * A complete theme preset with light and dark mode definitions.
 * Used by the CLI `adhar-ui theme <preset>` command.
 */
export interface ThemePreset {
  /** Machine-readable name (e.g. "zinc", "blue") */
  name: string;
  /** Human-readable label (e.g. "Zinc", "Blue") */
  label: string;
  light: ThemeTokens;
  dark: ThemeTokens;
}

/** Runtime configuration for the AdharUI facade. */
export interface AdharUIConfig {
  /** Active theme preset name */
  theme: string;
  /** Default border radius */
  radius: string;
  /** Whether dark mode is active */
  darkMode: boolean;
  /** CSS variable namespace prefix (e.g. "adhar-") */
  cssVariablePrefix: string;
}

/** Named breakpoint identifiers for responsive design. */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Maps breakpoint names to their CSS media query values. */
export interface BreakpointConfig {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}
