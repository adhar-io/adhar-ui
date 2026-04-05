/**
 * Design kit generator module.
 * Produces SVG + JSON design system kits importable into Penpot.
 *
 * @module
 */

export {
  type DesignKit,
  type DesignKitFile,
  generateDesignKit,
  type PenpotManifest,
} from './design-kit.ts';
export {
  createDefaultPalette,
  type DesignPalette,
  renderBadge,
  renderButton,
  renderCard,
  renderColorSwatch,
  type RenderedComponent,
  renderInput,
  renderSimpleComponents,
  renderSpacingScale,
  renderTypographySample,
} from './svg-renderer.ts';
