/**
 * @adhar-ui/dtcg
 *
 * W3C Design Tokens Community Group (DTCG) interchange layer for Adhar UI.
 * Provides bidirectional lossless conversion between:
 *
 *  - Adhar UI ThemePreset (HSL triplets in TypeScript)
 *  - W3C DTCG JSON (standard interchange format)
 *  - Figma Variables API (RGBA + modes)
 *  - Penpot library colors (hex + groups)
 *
 * The DTCG format serves as the canonical interchange layer. All design
 * tool integrations convert to/from DTCG, never directly between tools.
 * This keeps the conversion matrix at O(n) instead of O(n^2).
 *
 * ```
 * ThemePreset ←→ DTCG JSON ←→ Figma Variables
 *                    ↕
 *              Penpot Colors
 * ```
 *
 * HSL round-trip fidelity is preserved via the `$extensions["com.adhar-ui"].hslRaw`
 * field in the DTCG output.
 *
 * @example
 * ```ts
 * import { themeToDtcg, dtcgToTheme, dtcgToFigma, validateDtcg } from '@adhar-ui/dtcg'
 * import { zinc } from '@adhar-ui/tokens'
 *
 * // Export: Code → DTCG → Figma
 * const dtcg = themeToDtcg(zinc)
 * const figmaPayload = dtcgToFigma(dtcg)
 *
 * // Import: DTCG → Code
 * const theme = dtcgToTheme(dtcg, 'custom', 'Custom')
 *
 * // Validate a DTCG file
 * const result = validateDtcg(JSON.parse(fileContents))
 * if (!result.valid) console.error(result.errors)
 * ```
 *
 * @module
 */

// ─── Type Definitions ─────────────────────────────────────────────────
export type {
  AdharUIExtension,
  DTCGDocument,
  DTCGGroup,
  DTCGToken,
  DTCGTokenType,
  FigmaRGBA,
  FigmaVariable,
  FigmaVariableCollection,
  FigmaVariableValue,
  PenpotColor,
} from './types.ts';

// ─── Color Utilities ──────────────────────────────────────────────────
export {
  figmaRGBAToHex,
  figmaRGBAToHslTriplet,
  formatHslTriplet,
  hexToFigmaRGBA,
  hexToHsl,
  hexToHslTriplet,
  hslToHex,
  hslToRgb,
  hslTripletToFigmaRGBA,
  hslTripletToHex,
  parseHslTriplet,
} from './color-utils.ts';

// ─── ThemePreset ↔ DTCG ──────────────────────────────────────────────
export { themeToDtcg } from './theme-to-dtcg.ts';
export { dtcgToTheme } from './dtcg-to-theme.ts';

// ─── Figma ↔ DTCG ───────────────────────────────────────────────────
export { figmaToDtcg } from './figma-to-dtcg.ts';
export { dtcgToFigma, type FigmaVariablesPayload } from './dtcg-to-figma.ts';

// ─── Penpot ↔ DTCG ──────────────────────────────────────────────────
export { penpotToDtcg } from './penpot-to-dtcg.ts';
export { dtcgToPenpot } from './dtcg-to-penpot.ts';

// ─── Validation ──────────────────────────────────────────────────────
export { validateDtcg, type ValidationError, type ValidationResult } from './validators.ts';
