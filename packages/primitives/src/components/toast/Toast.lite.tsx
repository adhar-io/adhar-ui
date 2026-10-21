import { onUnMount, onUpdate, Show, useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import {
  toastCloseVariants,
  toastDescriptionVariants,
  toastTitleVariants,
  toastVariants,
} from './toast.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-toast' },
});

export interface ToastProps {
  /** Visible unless explicitly false */
  open?: boolean;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  className?: string;
  titleClass?: string;
  descriptionClass?: string;
  closeClass?: string;
  title?: string;
  description?: string;
  /**
   * Auto-dismiss after this many ms (calls onClose). 0 or omitted keeps the
   * toast open. The timer pauses while hovered or focused.
   */
  duration?: number;
  /** Hide the close button (e.g. when an action closes the toast) */
  hideClose?: boolean;
  /** Accessible label for the close button (default "Close") */
  closeLabel?: string;
  onClose?: () => void;
  /** Actions or extra content below the description */
  children?: any;
}

export default function Toast(props: ToastProps) {
  const state = useStore({
    inst: { timer: 0 as any },
    get isOpen(): boolean {
      return props.open !== false;
    },
    get isUrgent(): boolean {
      return props.variant === 'destructive' || props.variant === 'warning';
    },
    get classes(): string {
      return cn(toastVariants({ variant: props.variant }), props.className);
    },
    get titleClasses(): string {
      return cn(toastTitleVariants(), props.titleClass);
    },
    get descriptionClasses(): string {
      return cn(toastDescriptionVariants(), props.descriptionClass);
    },
    get closeClasses(): string {
      return cn(toastCloseVariants(), props.closeClass);
    },
    stopTimer() {
      if (state.inst.timer) clearTimeout(state.inst.timer);
      state.inst.timer = 0;
    },
    startTimer() {
      state.stopTimer();
      if (!state.isOpen || !props.duration || props.duration <= 0) return;
      state.inst.timer = setTimeout(() => {
        state.inst.timer = 0;
        props.onClose?.();
      }, props.duration);
    },
  });

  onUpdate(() => {
    state.startTimer();
  }, [state.isOpen, props.duration]);

  onUnMount(() => {
    state.stopTimer();
  });

  return (
    <Show when={state.isOpen}>
      <div
        className={state.classes}
        role={state.isUrgent ? 'alert' : 'status'}
        aria-live={state.isUrgent ? 'assertive' : 'polite'}
        aria-atomic='true'
        data-state='open'
        onMouseEnter={() => state.stopTimer()}
        onMouseLeave={() => state.startTimer()}
        onFocusIn={() => state.stopTimer()}
        onFocusOut={() => state.startTimer()}
      >
        <div className='grid flex-1 gap-1'>
          <Show when={props.title}>
            <div className={state.titleClasses}>{props.title}</div>
          </Show>
          <Show when={props.description}>
            <div className={state.descriptionClasses}>{props.description}</div>
          </Show>
          {props.children}
        </div>
        <Show when={!props.hideClose}>
          <button
            type='button'
            className={state.closeClasses}
            aria-label={props.closeLabel || 'Close'}
            onClick={() => props.onClose?.()}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
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
    </Show>
  );
}
