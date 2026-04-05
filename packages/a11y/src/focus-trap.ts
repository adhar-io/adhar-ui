import { getFirstFocusable, getFocusableElements } from '@adhar-ui/utils';

export interface FocusTrapOptions {
  /** The container element to trap focus within */
  container: HTMLElement;
  /** Element to focus when trap activates. Defaults to first focusable. */
  initialFocus?: HTMLElement | null;
  /** Element to focus when trap deactivates. Defaults to previously focused element. */
  returnFocus?: HTMLElement | null;
  /** Whether to auto-focus on activation. Default true. */
  autoFocus?: boolean;
}

/**
 * Creates a focus trap within a container element.
 * Used for modals, dialogs, drawers, and other overlay components.
 * Returns a cleanup function to deactivate the trap.
 *
 * @example
 * const cleanup = createFocusTrap({ container: dialogEl })
 * // later...
 * cleanup()
 */
export function createFocusTrap(options: FocusTrapOptions): () => void {
  const { container, initialFocus, returnFocus, autoFocus = true } = options;
  const previouslyFocused = document.activeElement as HTMLElement | null;

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;

    const focusableElements = getFocusableElements(container);
    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  // Activate
  container.addEventListener('keydown', handleKeyDown);

  if (autoFocus) {
    const target = initialFocus ?? getFirstFocusable(container);
    target?.focus();
  }

  // Return deactivation function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
    const focusTarget = returnFocus ?? previouslyFocused;
    focusTarget?.focus();
  };
}
