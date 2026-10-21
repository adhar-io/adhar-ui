// @ts-nocheck
import { Show, createSignal, createMemo } from "solid-js";

export interface AlertProps {
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  /**
   * ARIA role. Defaults to "alert" (assertive) for destructive / warning and
   * "status" (polite) otherwise. Use "none" for static, non-urgent notes.
   */
  role?: string;
  /** Leading icon; positioned automatically by the alert styles */
  icon?: any;
  /** Shows a close button that calls this handler */
  onDismiss?: () => void;
  /** Accessible label for the close button (default "Dismiss") */
  dismissLabel?: string;
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { alertVariants } from "./alert.styles.ts";

function Alert(props: AlertProps) {
  const classes = createMemo(() => {
    return cn(
      alertVariants({
        variant: props.variant,
      }),
      props.onDismiss ? "pr-10" : "",
      props.className
    );
  });

  const roleValue = createMemo(() => {
    if (props.role) return props.role;
    return props.variant === "destructive" || props.variant === "warning"
      ? "alert"
      : "status";
  });

  return (
    <div class={classes()} id={props.id} role={roleValue()}>
      <Show when={props.icon}>{props.icon}</Show>
      <div>{props.children}</div>
      <Show when={props.onDismiss}>
        <button
          class="absolute right-2 top-2 rounded-md p-1.5 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          type="button"
          aria-label={props.dismissLabel || "Dismiss"}
          onClick={(event) => props.onDismiss?.()}
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
  );
}

export default Alert;
