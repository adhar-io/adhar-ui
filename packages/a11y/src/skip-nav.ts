/**
 * Skip navigation link utilities.
 * Provides a skip-to-content link for keyboard users to bypass navigation.
 */

export interface SkipNavConfig {
  /** The ID of the main content element */
  contentId?: string;
  /** The text for the skip link */
  label?: string;
}

/**
 * Creates a skip navigation link element.
 * The link is visually hidden until focused, then appears at the top of the page.
 */
export function createSkipNavLink(config: SkipNavConfig = {}): HTMLAnchorElement {
  const { contentId = 'main-content', label = 'Skip to main content' } = config;

  const link = document.createElement('a');
  link.href = `#${contentId}`;
  link.textContent = label;
  link.className = [
    'sr-only',
    'focus:not-sr-only',
    'focus:fixed',
    'focus:top-4',
    'focus:left-4',
    'focus:z-50',
    'focus:rounded-md',
    'focus:bg-primary',
    'focus:px-4',
    'focus:py-2',
    'focus:text-primary-foreground',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-ring',
  ].join(' ');

  return link;
}

/**
 * Tailwind classes for a skip navigation link.
 * Apply these to an anchor element pointing to your main content.
 */
export const skipNavClasses =
  'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring';
