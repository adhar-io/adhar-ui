/**
 * Roving tabindex manager for keyboard navigation within composite widgets.
 * Implements the WAI-ARIA roving tabindex pattern for toolbars, tab lists,
 * menu bars, listboxes, and other composite widgets.
 */

export interface RovingTabIndexOptions {
  /** The container element */
  container: HTMLElement;
  /** CSS selector for focusable items within the container */
  itemSelector: string;
  /** Orientation of the widget. Determines which arrow keys to handle. */
  orientation?: 'horizontal' | 'vertical' | 'both';
  /** Whether navigation wraps around. Default true. */
  wrap?: boolean;
  /** Callback when the active item changes */
  onActiveChange?: (element: HTMLElement, index: number) => void;
}

/**
 * Initialize roving tabindex on a container.
 * Returns a cleanup function to remove event listeners.
 *
 * @example
 * const cleanup = createRovingTabIndex({
 *   container: toolbarEl,
 *   itemSelector: '[role="tab"]',
 *   orientation: 'horizontal',
 * })
 */
export function createRovingTabIndex(options: RovingTabIndexOptions): () => void {
  const {
    container,
    itemSelector,
    orientation = 'horizontal',
    wrap = true,
    onActiveChange,
  } = options;

  function getItems(): HTMLElement[] {
    return Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
  }

  function setActive(items: HTMLElement[], index: number): void {
    items.forEach((item, i) => {
      item.setAttribute('tabindex', i === index ? '0' : '-1');
    });
    items[index]?.focus();
    onActiveChange?.(items[index], index);
  }

  function handleKeyDown(event: KeyboardEvent): void {
    const items = getItems();
    const currentIndex = items.findIndex((item) => item === document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;
    const isHorizontal = orientation === 'horizontal' || orientation === 'both';
    const isVertical = orientation === 'vertical' || orientation === 'both';

    switch (event.key) {
      case 'ArrowRight':
        if (!isHorizontal) return;
        nextIndex = currentIndex + 1;
        break;
      case 'ArrowLeft':
        if (!isHorizontal) return;
        nextIndex = currentIndex - 1;
        break;
      case 'ArrowDown':
        if (!isVertical) return;
        nextIndex = currentIndex + 1;
        break;
      case 'ArrowUp':
        if (!isVertical) return;
        nextIndex = currentIndex - 1;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();

    if (wrap) {
      nextIndex = (nextIndex + items.length) % items.length;
    } else {
      nextIndex = Math.max(0, Math.min(nextIndex, items.length - 1));
    }

    setActive(items, nextIndex);
  }

  // Initialize: first item gets tabindex="0", rest get "-1"
  const items = getItems();
  items.forEach((item, i) => {
    item.setAttribute('tabindex', i === 0 ? '0' : '-1');
  });

  container.addEventListener('keydown', handleKeyDown);

  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
}
