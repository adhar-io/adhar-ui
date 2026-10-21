import { useMetadata, useRef, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { commandVariants } from './command.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-command' },
});

export interface CommandProps {
  className?: string;
  'aria-label'?: string;
  /** Wrap arrow-key navigation from last to first item (default true) */
  loop?: boolean;
  /**
   * Fires with the value of the item ArrowUp / ArrowDown / Home / End should
   * highlight. Store it and pass `selected` to the matching CommandItem; Enter
   * then selects the highlighted item.
   */
  onHighlightChange?: (value: string) => void;
  children?: any;
}

// Command menu / palette container. Filtering is driven by the consumer;
// keyboard highlight is computed here from the rendered items.
export default function Command(props: CommandProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const state = useStore({
    get classes(): string {
      return cn(commandVariants(), props.className);
    },
    getItems(): HTMLElement[] {
      if (!rootRef) return [];
      return Array.from(rootRef.querySelectorAll('[role="option"]')).filter(
        (el: any) => el.getAttribute('aria-disabled') !== 'true',
      ) as HTMLElement[];
    },
    handleKeyDown(event: any) {
      const items = state.getItems();
      if (items.length === 0) return;
      const current = items.findIndex((el) => el.getAttribute('aria-selected') === 'true');
      if (event.key === 'Enter') {
        if (current >= 0) {
          event.preventDefault();
          items[current].click();
        }
        return;
      }
      let next = -1;
      const loop = props.loop !== false;
      if (event.key === 'ArrowDown') {
        next = current + 1 >= items.length ? (loop ? 0 : items.length - 1) : current + 1;
      } else if (event.key === 'ArrowUp') {
        next = current <= 0 ? (loop ? items.length - 1 : 0) : current - 1;
      } else if (event.key === 'Home') {
        next = 0;
      } else if (event.key === 'End') {
        next = items.length - 1;
      }
      if (next < 0) return;
      event.preventDefault();
      props.onHighlightChange?.(items[next].getAttribute('data-value') || '');
      items[next].scrollIntoView({ block: 'nearest' });
    },
  });

  return (
    <div
      ref={rootRef}
      className={state.classes}
      aria-label={props['aria-label'] || 'Command menu'}
      onKeyDown={(event) => state.handleKeyDown(event)}
    >
      {props.children}
    </div>
  );
}
