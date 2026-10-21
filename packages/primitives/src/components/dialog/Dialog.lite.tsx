import {
  onInit,
  onUnMount,
  onUpdate,
  Show,
  useMetadata,
  useRef,
  useStore,
} from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import {
  dialogCloseVariants,
  dialogContentVariants,
  dialogOverlayVariants,
} from './dialog.styles.ts';
import { focusInto, lockBodyScroll, trapTab, unlockBodyScroll } from '../_internal/dom.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-dialog' },
});

export interface DialogProps {
  /** Controlled open state */
  open?: boolean;
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean;
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
  /** "alertdialog" for confirmations that need an explicit choice */
  role?: 'dialog' | 'alertdialog';
  /** Close when the backdrop is clicked (default true) */
  closeOnOverlayClick?: boolean;
  /** Close on Escape (default true) */
  closeOnEscape?: boolean;
  /** Render the top-right close button (default true) */
  showClose?: boolean;
  /** Accessible label for the close button (default "Close") */
  closeLabel?: string;
  /** ID of the DialogTitle — announced when the dialog opens */
  'aria-labelledby'?: string;
  /** ID of the DialogDescription */
  'aria-describedby'?: string;
  /** Label when there is no visible title */
  'aria-label'?: string;
  id?: string;
  className?: string;
  overlayClass?: string;
  /** Classes for the dialog panel (alias of className) */
  contentClass?: string;
  /** Fires when the dialog asks to close (Escape, backdrop, close button) */
  onClose?: () => void;
  /** Fires with the next open state */
  onOpenChange?: (open: boolean) => void;
  children?: any;
}

// Focus moves into the dialog on open (the first [data-autofocus] element, else
// the first focusable one) and returns to the previously focused element on
// close. Tab is trapped inside and page scroll is locked while open.
export default function Dialog(props: DialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const state = useStore({
    internalOpen: false,
    /* Mutated in place so it survives every framework’s closures. */
    inst: { wasOpen: false, restoreTo: null as HTMLElement | null },
    get isOpen(): boolean {
      return props.open !== undefined ? !!props.open : state.internalOpen;
    },
    get overlayClasses(): string {
      return cn(dialogOverlayVariants(), props.overlayClass);
    },
    get contentClasses(): string {
      return cn(dialogContentVariants({ size: props.size }), props.contentClass, props.className);
    },
    get closeClasses(): string {
      return cn(dialogCloseVariants());
    },
    requestClose() {
      state.internalOpen = false;
      props.onClose?.();
      props.onOpenChange?.(false);
    },
    handleOverlayClick(event: any) {
      if (event.target === event.currentTarget && props.closeOnOverlayClick !== false) {
        state.requestClose();
      }
    },
    handleKeyDown(event: any) {
      if (event.key === 'Escape' && props.closeOnEscape !== false) {
        event.stopPropagation();
        state.requestClose();
        return;
      }
      trapTab(event, contentRef);
    },
    syncOpen() {
      if (typeof document === 'undefined') return;
      if (state.isOpen && !state.inst.wasOpen) {
        state.inst.wasOpen = true;
        state.inst.restoreTo = document.activeElement as HTMLElement;
        lockBodyScroll();
        setTimeout(() => focusInto(contentRef));
      } else if (!state.isOpen && state.inst.wasOpen) {
        state.inst.wasOpen = false;
        unlockBodyScroll();
        const target = state.inst.restoreTo;
        state.inst.restoreTo = null;
        if (target && target.focus) setTimeout(() => target.focus());
      }
    },
  });

  onInit(() => {
    state.internalOpen = !!props.defaultOpen;
  });

  onUpdate(() => {
    state.syncOpen();
  }, [state.isOpen]);

  onUnMount(() => {
    if (state.inst.wasOpen) {
      state.inst.wasOpen = false;
      unlockBodyScroll();
    }
  });

  return (
    <Show when={state.isOpen}>
      <div
        className={state.overlayClasses}
        data-state='open'
        onClick={(event) => state.handleOverlayClick(event)}
        onKeyDown={(event) => state.handleKeyDown(event)}
      >
        <div
          ref={contentRef}
          className={state.contentClasses}
          id={props.id}
          role={props.role || 'dialog'}
          aria-modal='true'
          aria-labelledby={props['aria-labelledby']}
          aria-describedby={props['aria-describedby']}
          aria-label={props['aria-label']}
          data-state='open'
          tabIndex={-1}
        >
          {props.children}
          <Show when={props.showClose !== false}>
            <button
              type='button'
              className={state.closeClasses}
              aria-label={props.closeLabel || 'Close'}
              onClick={() => state.requestClose()}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                aria-hidden='true'
              >
                <path d='M18 6 6 18' />
                <path d='m6 6 12 12' />
              </svg>
            </button>
          </Show>
        </div>
      </div>
    </Show>
  );
}
