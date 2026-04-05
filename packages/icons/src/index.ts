/**
 * @adhar-ui/icons
 *
 * Icon system for the Adhar UI design system.
 * Provides a registry-based SVG icon management system that is
 * framework-agnostic. Ships with 17 essential icons (Lucide-compatible)
 * and supports custom icon registration.
 *
 * Icons are rendered as inline SVGs with configurable size, stroke width,
 * and color. Each icon supports accessible labeling via aria-label.
 *
 * @example
 * ```ts
 * import { getIcon, renderIconSvg, registerIcon } from '@adhar-ui/icons'
 *
 * // Render a built-in icon
 * const svg = renderIconSvg(getIcon('search')!, { size: 20 })
 *
 * // Register a custom icon
 * registerIcon({
 *   name: 'custom',
 *   svg: '<path d="M12 2L2 7l10 5 10-5-10-5z"/>',
 *   keywords: ['custom'],
 * })
 * ```
 *
 * @module
 */

export type { IconDefinition, IconProps } from './types.ts';
export {
  getAllIcons,
  getIcon,
  hasIcon,
  registerIcon,
  registerIcons,
  renderIconSvg,
} from './registry.ts';
