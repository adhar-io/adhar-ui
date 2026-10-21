/**
 * DOM helpers shared by the Mitosis components.
 *
 * These run inside event handlers and lifecycle hooks of every framework
 * target, so they only touch the DOM nodes passed in and keep no per-component
 * state. Anything a component needs to remember lives in its own store.
 */

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(',');

function isVisible(el: HTMLElement): boolean {
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

/** Tabbable descendants of `container`, in DOM order. */
export function getFocusable(container: HTMLElement | null | undefined): HTMLElement[] {
  if (!container) return [];
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('inert') && el.getAttribute('aria-hidden') !== 'true' && isVisible(el),
  );
}

/**
 * Moves focus into `container`: the first element marked `data-autofocus`,
 * else the first tabbable element, else the container itself.
 */
export function focusInto(container: HTMLElement | null | undefined): void {
  if (!container) return;
  const preferred = container.querySelector<HTMLElement>('[data-autofocus]');
  const target = preferred || getFocusable(container)[0] || container;
  target.focus({ preventScroll: true });
}

/** Keeps Tab / Shift+Tab cycling inside `container`. Call from a keydown handler. */
export function trapTab(event: KeyboardEvent, container: HTMLElement | null | undefined): void {
  if (event.key !== 'Tab' || !container) return;
  const items = getFocusable(container);
  if (items.length === 0) {
    event.preventDefault();
    container.focus();
    return;
  }
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement;
  if (event.shiftKey && (active === first || active === container)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

let scrollLocks = 0;
let savedOverflow = '';
let savedPaddingRight = '';

/** Locks page scroll. Reference-counted, so stacked overlays unlock correctly. */
export function lockBodyScroll(): void {
  if (typeof document === 'undefined') return;
  if (scrollLocks === 0) {
    const body = document.body;
    const scrollbar = globalThis.innerWidth - document.documentElement.clientWidth;
    savedOverflow = body.style.overflow;
    savedPaddingRight = body.style.paddingRight;
    body.style.overflow = 'hidden';
    // Keep layout from shifting when the scrollbar disappears.
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
  }
  scrollLocks += 1;
}

export function unlockBodyScroll(): void {
  if (typeof document === 'undefined' || scrollLocks === 0) return;
  scrollLocks -= 1;
  if (scrollLocks === 0) {
    document.body.style.overflow = savedOverflow;
    document.body.style.paddingRight = savedPaddingRight;
  }
}

export interface RovingOptions {
  /** Which arrow keys move focus. */
  orientation?: 'horizontal' | 'vertical' | 'both';
  /** Wrap from last to first and back (default true). */
  loop?: boolean;
  /** Click the newly focused item — selection follows focus (tabs, radios). */
  activate?: boolean;
}

/**
 * Arrow-key / Home / End navigation between the `selector` items inside
 * `container`. Disabled items are skipped. Returns true when it handled the key.
 */
export function rovingFocus(
  event: KeyboardEvent,
  container: HTMLElement | null | undefined,
  selector: string,
  options: RovingOptions = {},
): boolean {
  if (!container) return false;
  const orientation = options.orientation || 'both';
  const loop = options.loop !== false;
  const prevKeys = orientation === 'horizontal'
    ? ['ArrowLeft']
    : orientation === 'vertical'
    ? ['ArrowUp']
    : ['ArrowLeft', 'ArrowUp'];
  const nextKeys = orientation === 'horizontal'
    ? ['ArrowRight']
    : orientation === 'vertical'
    ? ['ArrowDown']
    : ['ArrowRight', 'ArrowDown'];
  const key = event.key;
  if (!prevKeys.includes(key) && !nextKeys.includes(key) && key !== 'Home' && key !== 'End') {
    return false;
  }

  const items = Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !(el as HTMLButtonElement).disabled && el.getAttribute('aria-disabled') !== 'true',
  );
  if (items.length === 0) return false;

  const current = items.indexOf(document.activeElement as HTMLElement);
  let next = current;
  if (key === 'Home') next = 0;
  else if (key === 'End') next = items.length - 1;
  else if (nextKeys.includes(key)) {
    next = current < 0 ? 0 : current + 1;
    if (next >= items.length) next = loop ? 0 : items.length - 1;
  } else {
    next = current < 0 ? items.length - 1 : current - 1;
    if (next < 0) next = loop ? items.length - 1 : 0;
  }

  event.preventDefault();
  const target = items[next];
  target.focus();
  if (options.activate && next !== current) target.click();
  return true;
}

/**
 * Roving tabindex for composite widgets (radio groups, toolbars): makes sure
 * exactly one enabled item is in the tab order. Prefers `activeSelector`
 * (e.g. the checked radio), else the first enabled item.
 */
export function syncTabStops(
  container: HTMLElement | null | undefined,
  selector: string,
  activeSelector: string,
): void {
  if (!container) return;
  const items = Array.from(container.querySelectorAll<HTMLElement>(selector));
  const enabled = items.filter((el) => !(el as HTMLButtonElement).disabled);
  const active = enabled.find((el) => el.matches(activeSelector)) || enabled[0];
  for (const el of items) el.tabIndex = el === active ? 0 : -1;
}

/** Initials from a name, for avatar fallbacks: "Ada Lovelace" → "AL". */
export function initials(name: string | undefined, max = 2): string {
  if (!name) return '';
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, max)
    .map((part) => part[0]!.toUpperCase())
    .join('');
}

/** Clamp to [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
