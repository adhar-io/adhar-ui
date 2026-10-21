import { onInit, onUpdate, Show, useMetadata, useRef, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { dropdownMenuContentVariants } from './dropdown-menu.styles.ts';
import { buttonVariants } from '../button/button.styles.ts';
import { placementVariants } from '../_internal/placement.styles.ts';
import { rovingFocus } from '../_internal/dom.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-dropdown-menu' },
});

export interface DropdownMenuProps {
  /** Controlled open state */
  open?: boolean;
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  /** Close the menu after an item is chosen (default true) */
  closeOnSelect?: boolean;
  /** Wrap arrow-key navigation from last to first item (default true) */
  loop?: boolean;
  disabled?: boolean;
  /** Prefix for the menu id, wired to the trigger’s aria-controls */
  id?: string;
  className?: string;
  /** Trigger classes. Defaults to an outline button. */
  triggerClass?: string;
  contentClass?: string;
  /** Accessible label for the trigger when its content is an icon */
  triggerLabel?: string;
  onOpenChange?: (open: boolean) => void;
  /** Content of the trigger button (text or icon — not another button) */
  trigger?: any;
  children?: any;
}

// WAI-ARIA menu button: Enter / Space / ArrowDown open the menu on the first
// item, ArrowUp on the last; arrows, Home and End move between items; Escape
// and Tab close it. Outside clicks hit a transparent backdrop.
export default function DropdownMenu(props: DropdownMenuProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const state = useStore({
    internalOpen: false,
    inst: { focusLast: false },
    get isOpen(): boolean {
      return props.open !== undefined ? !!props.open : state.internalOpen;
    },
    get resolvedSide(): 'top' | 'right' | 'bottom' | 'left' {
      return props.side || 'bottom';
    },
    get menuId(): string | undefined {
      return props.id ? props.id + '-menu' : undefined;
    },
    get rootClasses(): string {
      return cn('relative inline-block', props.className);
    },
    get triggerClasses(): string {
      return props.triggerClass === undefined
        ? buttonVariants({ variant: 'outline' })
        : props.triggerClass;
    },
    get contentClasses(): string {
      return cn(
        placementVariants({ side: state.resolvedSide, align: props.align || 'start' }),
        dropdownMenuContentVariants(),
        props.contentClass,
      );
    },
    setOpen(next: boolean, restoreFocus: boolean) {
      if (next && props.disabled) return;
      state.internalOpen = next;
      props.onOpenChange?.(next);
      if (!next && restoreFocus && triggerRef) triggerRef.focus();
    },
    focusItem(last: boolean) {
      if (!contentRef) return;
      const items = Array.from(
        contentRef.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])'),
      ) as HTMLElement[];
      const target = last ? items[items.length - 1] : items[0];
      (target || contentRef).focus();
    },
    handleTriggerKeyDown(event: any) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        state.inst.focusLast = event.key === 'ArrowUp';
        if (state.isOpen) state.focusItem(state.inst.focusLast);
        else state.setOpen(true, false);
      }
    },
    handleContentKeyDown(event: any) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        state.setOpen(false, true);
        return;
      }
      if (event.key === 'Tab') {
        state.setOpen(false, false);
        return;
      }
      rovingFocus(event, contentRef, '[role="menuitem"]', {
        orientation: 'vertical',
        loop: props.loop !== false,
      });
    },
    handleContentClick(event: any) {
      const item = event.target.closest ? event.target.closest('[role="menuitem"]') : null;
      if (!item || item.getAttribute('aria-disabled') === 'true') return;
      if (props.closeOnSelect !== false) state.setOpen(false, true);
    },
  });

  onInit(() => {
    state.internalOpen = !!props.defaultOpen;
  });

  onUpdate(() => {
    if (state.isOpen) {
      const last = state.inst.focusLast;
      state.inst.focusLast = false;
      setTimeout(() => state.focusItem(last));
    }
  }, [state.isOpen]);

  return (
    <div className={state.rootClasses} data-state={state.isOpen ? 'open' : 'closed'}>
      <button
        ref={triggerRef}
        type='button'
        className={state.triggerClasses}
        disabled={props.disabled}
        aria-label={props.triggerLabel}
        aria-expanded={state.isOpen}
        aria-haspopup='menu'
        aria-controls={state.isOpen ? state.menuId : undefined}
        data-state={state.isOpen ? 'open' : 'closed'}
        onClick={() => state.setOpen(!state.isOpen, false)}
        onKeyDown={(event) => state.handleTriggerKeyDown(event)}
      >
        {props.trigger}
      </button>
      <Show when={state.isOpen}>
        <div
          className='fixed inset-0 z-40'
          aria-hidden='true'
          onClick={() => state.setOpen(false, true)}
        />
        <div
          ref={contentRef}
          id={state.menuId}
          className={state.contentClasses}
          role='menu'
          aria-orientation='vertical'
          data-state='open'
          data-side={state.resolvedSide}
          tabIndex={-1}
          onKeyDown={(event) => state.handleContentKeyDown(event)}
          onClick={(event) => state.handleContentClick(event)}
        >
          {props.children}
        </div>
      </Show>
    </div>
  );
}
