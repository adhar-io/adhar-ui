/**
 * @adhar-ui/utils
 *
 * Framework-agnostic utility functions for the Adhar UI design system.
 * Provides class name merging, responsive helpers, and DOM utilities
 * used internally by components and available to consumers.
 *
 * @example
 * ```ts
 * import { cn, isMobile, lockScroll } from '@adhar-ui/utils'
 *
 * // Merge Tailwind classes
 * const cls = cn('px-4 py-2', isActive && 'bg-primary')
 *
 * // Check viewport
 * if (isMobile()) { ... }
 *
 * // Lock scroll for modals
 * const unlock = lockScroll()
 * // later: unlock()
 * ```
 *
 * @module
 */

// ─── Class Name Merging ──────────────────────────────────────────────
export { cn } from './cn.ts';

// ─── Responsive Helpers ──────────────────────────────────────────────
export {
  getCurrentBreakpoint,
  isAtLeast,
  isMobile,
  matchesMediaQuery,
  maxWidth,
  minWidth,
} from './responsive.ts';

// ─── DOM Utilities ───────────────────────────────────────────────────
export {
  generateId,
  getFirstFocusable,
  getFocusableElements,
  getLastFocusable,
  isInViewport,
  lockScroll,
} from './dom.ts';
