/**
 * DOM utility functions for component internals.
 * Framework-agnostic helpers for focus management, scroll locking, etc.
 */

/**
 * Get all focusable elements within a container.
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ');

  return Array.from(container.querySelectorAll<HTMLElement>(selector));
}

/**
 * Get the first focusable element within a container.
 */
export function getFirstFocusable(container: HTMLElement): HTMLElement | null {
  const elements = getFocusableElements(container);
  return elements[0] ?? null;
}

/**
 * Get the last focusable element within a container.
 */
export function getLastFocusable(container: HTMLElement): HTMLElement | null {
  const elements = getFocusableElements(container);
  return elements[elements.length - 1] ?? null;
}

/**
 * Lock body scroll (for modals, drawers, etc.).
 * Returns a cleanup function to restore scroll.
 */
export function lockScroll(): () => void {
  const scrollY = globalThis.scrollY;
  const body = document.body;
  const originalStyles = {
    overflow: body.style.overflow,
    position: body.style.position,
    top: body.style.top,
    width: body.style.width,
  };

  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}px`;
  body.style.width = '100%';

  return () => {
    body.style.overflow = originalStyles.overflow;
    body.style.position = originalStyles.position;
    body.style.top = originalStyles.top;
    body.style.width = originalStyles.width;
    globalThis.scrollTo(0, scrollY);
  };
}

/**
 * Generate a unique ID for ARIA attributes.
 */
let idCounter = 0;
export function generateId(prefix = 'adhar-ui'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/**
 * Check if an element is visible in the viewport.
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (globalThis.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (globalThis.innerWidth || document.documentElement.clientWidth)
  );
}
