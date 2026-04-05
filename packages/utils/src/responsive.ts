import { breakpointValues } from '@adhar-ui/tokens';
import type { Breakpoint } from '@adhar-ui/tokens';

/**
 * Check if a media query matches (SSR-safe).
 * Returns false during server-side rendering.
 */
export function matchesMediaQuery(query: string): boolean {
  if (typeof globalThis.matchMedia === 'undefined') return false;
  return globalThis.matchMedia(query).matches;
}

/**
 * Get the current breakpoint based on window width.
 * Returns 'xs' during SSR.
 */
export function getCurrentBreakpoint(): Breakpoint {
  if (typeof globalThis.innerWidth === 'undefined') return 'xs';

  const width = globalThis.innerWidth;
  if (width >= breakpointValues['2xl']) return '2xl';
  if (width >= breakpointValues.xl) return 'xl';
  if (width >= breakpointValues.lg) return 'lg';
  if (width >= breakpointValues.md) return 'md';
  if (width >= breakpointValues.sm) return 'sm';
  return 'xs';
}

/**
 * Check if the current viewport is mobile-sized (below md breakpoint).
 * Returns true during SSR (mobile-first).
 */
export function isMobile(): boolean {
  if (typeof globalThis.innerWidth === 'undefined') return true;
  return globalThis.innerWidth < breakpointValues.md;
}

/**
 * Check if the current viewport is at least the given breakpoint.
 */
export function isAtLeast(breakpoint: Breakpoint): boolean {
  if (typeof globalThis.innerWidth === 'undefined') return false;
  return globalThis.innerWidth >= breakpointValues[breakpoint];
}

/**
 * Create a min-width media query string for a breakpoint.
 */
export function minWidth(breakpoint: Breakpoint): string {
  return `(min-width: ${breakpointValues[breakpoint]}px)`;
}

/**
 * Create a max-width media query string for a breakpoint.
 */
export function maxWidth(breakpoint: Breakpoint): string {
  return `(max-width: ${breakpointValues[breakpoint] - 1}px)`;
}
