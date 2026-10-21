// @ts-nocheck
import { Show, on, createEffect, createMemo, createSignal } from "solid-js";

export interface ToastProps {
  /** Visible unless explicitly false */
  open?: boolean;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
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

import { cn } from "@adhar-ui/utils";
import {
  toastCloseVariants,
  toastDescriptionVariants,
  toastTitleVariants,
  toastVariants,
} from "./toast.styles.ts";

function Toast(props: ToastProps) {
  const [inst, setInst] = createSignal({
    timer: 0 as any,
  });

  const isOpen = createMemo(() => {
    return props.open !== false;
  });

  const isUrgent = createMemo(() => {
    return props.variant === "destructive" || props.variant === "warning";
  });

  const classes = createMemo(() => {
    return cn(
      toastVariants({
        variant: props.variant,
      }),
      props.className
    );
  });

  const titleClasses = createMemo(() => {
    return cn(toastTitleVariants(), props.titleClass);
  });

  const descriptionClasses = createMemo(() => {
    return cn(toastDescriptionVariants(), props.descriptionClass);
  });

  const closeClasses = createMemo(() => {
    return cn(toastCloseVariants(), props.closeClass);
  });

  function stopTimer() {
    if (inst().timer) clearTimeout(inst().timer);
    inst().timer = 0;
  }

  function startTimer() {
    stopTimer();
    if (!isOpen() || !props.duration || props.duration <= 0) return;
    inst().timer = setTimeout(() => {
      inst().timer = 0;
      props.onClose?.();
    }, props.duration);
  }

  const onUpdateFn_0_isOpen__ = createMemo(() => isOpen());
  const onUpdateFn_0_props_duration = createMemo(() => props.duration);
  function onUpdateFn_0() {
    startTimer();
  }
  createEffect(
    on(
      () => [onUpdateFn_0_isOpen__(), onUpdateFn_0_props_duration()],
      onUpdateFn_0
    )
  );

  return (
    <Show when={isOpen()}>
      <div
        class={classes()}
        aria-atomic="true"
        data-state="open"
        role={isUrgent() ? "alert" : "status"}
        aria-live={isUrgent() ? "assertive" : "polite"}
        onMouseEnter={(event) => stopTimer()}
        onMouseLeave={(event) => startTimer()}
        onFocusIn={(event) => stopTimer()}
        onFocusOut={(event) => startTimer()}
      >
        <div class="grid flex-1 gap-1">
          <Show when={props.title}>
            <div class={titleClasses()}>{props.title}</div>
          </Show>
          <Show when={props.description}>
            <div class={descriptionClasses()}>{props.description}</div>
          </Show>
          {props.children}
        </div>
        <Show when={!props.hideClose}>
          <button
            class={closeClasses()}
            type="button"
            aria-label={props.closeLabel || "Close"}
            onClick={(event) => props.onClose?.()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </Show>
      </div>
    </Show>
  );
}

export default Toast;
