/**
 * @adhar-ui/a11y
 *
 * Accessibility primitives for the Adhar UI design system.
 * Provides framework-agnostic utilities for building accessible
 * components following WAI-ARIA best practices.
 *
 * Includes:
 *  - Focus trapping for modals/dialogs
 *  - Live region announcements for screen readers
 *  - Roving tabindex for composite widgets
 *  - Visually hidden styles for sr-only content
 *  - Skip navigation links
 *
 * @example
 * ```ts
 * import { createFocusTrap, announce } from '@adhar-ui/a11y'
 *
 * // Trap focus in a dialog
 * const release = createFocusTrap({ container: dialogEl })
 *
 * // Announce a message to screen readers
 * announce('Item added to cart')
 *
 * // Later, release the focus trap
 * release()
 * ```
 *
 * @module
 */

// ─── Focus Management ────────────────────────────────────────────────
export { createFocusTrap, type FocusTrapOptions } from './focus-trap.ts';

// ─── Screen Reader Announcements ─────────────────────────────────────
export { announce, cleanupLiveRegions } from './live-region.ts';

// ─── Keyboard Navigation ────────────────────────────────────────────
export { createRovingTabIndex, type RovingTabIndexOptions } from './roving-tabindex.ts';

// ─── Visually Hidden Content ─────────────────────────────────────────
export { applyVisuallyHidden, srOnly, visuallyHiddenStyles } from './visually-hidden.ts';

// ─── Skip Navigation ────────────────────────────────────────────────
export { createSkipNavLink, skipNavClasses, type SkipNavConfig } from './skip-nav.ts';
