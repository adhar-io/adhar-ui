import { onInit, onUpdate, Show, useMetadata, useRef, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { popoverContentVariants } from './popover.styles.ts';
import { buttonVariants } from '../button/button.styles.ts';
import { placementVariants } from '../_internal/placement.styles.ts';
import { focusInto } from '../_internal/dom.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-popover' },
});

export interface PopoverProps {
  /** Controlled open state */
  open?: boolean;
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  /** Move focus into the content on open (default true) */
  autoFocus?: boolean;
  disabled?: boolean;
  /** Prefix for the content id, wired to the trigger’s aria-controls */
  id?: string;
  className?: string;
  /** Trigger classes. Defaults to an outline button. */
  triggerClass?: string;
  contentClass?: string;
  /** Accessible label for the trigger when its content is an icon */
  triggerLabel?: string;
  /** Accessible label for the popover panel */
  'aria-label'?: string;
  onOpenChange?: (open: boolean) => void;
  /** Content of the trigger button (text or icon — not another button) */
  trigger?: any;
  children?: any;
}

// Closes on Escape, on a click outside (via a transparent backdrop, so it needs
// no document listeners), and when focus tabs out of the popover.
export default function Popover(props: PopoverProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const state = useStore({
    internalOpen: false,
    get isOpen(): boolean {
      return props.open !== undefined ? !!props.open : state.internalOpen;
    },
    get resolvedSide(): 'top' | 'right' | 'bottom' | 'left' {
      return props.side || 'bottom';
    },
    get contentId(): string | undefined {
      return props.id ? props.id + '-content' : undefined;
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
        placementVariants({ side: state.resolvedSide, align: props.align }),
        popoverContentVariants(),
        props.contentClass,
      );
    },
    setOpen(next: boolean, restoreFocus: boolean) {
      if (next && props.disabled) return;
      state.internalOpen = next;
      props.onOpenChange?.(next);
      if (!next && restoreFocus && triggerRef) triggerRef.focus();
    },
    handleKeyDown(event: any) {
      if (event.key === 'Escape' && state.isOpen) {
        event.stopPropagation();
        state.setOpen(false, true);
      }
    },
    handleFocusOut(event: any) {
      const next = event.relatedTarget;
      if (state.isOpen && next && rootRef && !rootRef.contains(next)) state.setOpen(false, false);
    },
  });

  onInit(() => {
    state.internalOpen = !!props.defaultOpen;
  });

  onUpdate(() => {
    if (state.isOpen && props.autoFocus !== false) setTimeout(() => focusInto(contentRef));
  }, [state.isOpen]);

  return (
    <div
      ref={rootRef}
      className={state.rootClasses}
      data-state={state.isOpen ? 'open' : 'closed'}
      onKeyDown={(event) => state.handleKeyDown(event)}
      onFocusOut={(event) => state.handleFocusOut(event)}
    >
      <button
        ref={triggerRef}
        type='button'
        className={state.triggerClasses}
        disabled={props.disabled}
        aria-label={props.triggerLabel}
        aria-expanded={state.isOpen}
        aria-haspopup='dialog'
        aria-controls={state.isOpen ? state.contentId : undefined}
        data-state={state.isOpen ? 'open' : 'closed'}
        onClick={() => state.setOpen(!state.isOpen, false)}
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
          id={state.contentId}
          className={state.contentClasses}
          role='dialog'
          aria-label={props['aria-label']}
          data-state='open'
          data-side={state.resolvedSide}
          tabIndex={-1}
        >
          {props.children}
        </div>
      </Show>
    </div>
  );
}
