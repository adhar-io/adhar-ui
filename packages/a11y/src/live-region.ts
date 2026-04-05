/**
 * Live region announcer for screen readers.
 * Provides a way to announce dynamic content changes to assistive technology.
 */

let politeRegion: HTMLElement | null = null;
let assertiveRegion: HTMLElement | null = null;

function getOrCreateRegion(politeness: 'polite' | 'assertive'): HTMLElement {
  const existing = politeness === 'polite' ? politeRegion : assertiveRegion;
  if (existing && document.body.contains(existing)) return existing;

  const region = document.createElement('div');
  region.setAttribute('role', 'status');
  region.setAttribute('aria-live', politeness);
  region.setAttribute('aria-atomic', 'true');
  region.style.cssText = [
    'position: absolute',
    'width: 1px',
    'height: 1px',
    'padding: 0',
    'margin: -1px',
    'overflow: hidden',
    'clip: rect(0, 0, 0, 0)',
    'white-space: nowrap',
    'border-width: 0',
  ].join('; ');

  document.body.appendChild(region);

  if (politeness === 'polite') {
    politeRegion = region;
  } else {
    assertiveRegion = region;
  }

  return region;
}

/**
 * Announce a message to screen readers.
 *
 * @param message - The message to announce
 * @param politeness - 'polite' (default) waits for silence, 'assertive' interrupts
 *
 * @example
 * announce('Item added to cart')
 * announce('Error: Invalid email address', 'assertive')
 */
export function announce(
  message: string,
  politeness: 'polite' | 'assertive' = 'polite',
): void {
  const region = getOrCreateRegion(politeness);
  // Clear and re-set to trigger announcement even for same message
  region.textContent = '';
  requestAnimationFrame(() => {
    region.textContent = message;
  });
}

/**
 * Clean up live region elements from the DOM.
 */
export function cleanupLiveRegions(): void {
  politeRegion?.remove();
  assertiveRegion?.remove();
  politeRegion = null;
  assertiveRegion = null;
}
