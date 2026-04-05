/**
 * CSS styles for visually hiding content while keeping it accessible to screen readers.
 * This is the standard "sr-only" pattern used across the design system.
 */

export const visuallyHiddenStyles: Record<string, string> = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: '0',
};

/**
 * Apply visually-hidden styles to an element.
 */
export function applyVisuallyHidden(element: HTMLElement): void {
  Object.assign(element.style, visuallyHiddenStyles);
}

/**
 * Tailwind CSS class for visually hidden content.
 */
export const srOnly = 'sr-only';
