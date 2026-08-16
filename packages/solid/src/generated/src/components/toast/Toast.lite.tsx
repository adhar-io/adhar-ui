// @ts-nocheck
import { Show } from "solid-js";

export interface ToastProps {
  open?: boolean;
  variant?: "default" | "destructive" | "success";
  className?: string;
  titleClass?: string;
  descriptionClass?: string;
  closeClass?: string;
  title?: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
  children?: any;
}

function Toast(props: ToastProps) {
  return (
    <div>
      <Show when={isOpen}>
        <div
          class={props.className}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div>
            <Show when={props.title}>
              <div class={props.titleClass}>{props.title}</div>
            </Show>
            <Show when={props.description}>
              <div class={props.descriptionClass}>{props.description}</div>
            </Show>
            {props.children}
          </div>
          <button
            class={props.closeClass}
            type="button"
            aria-label="Close"
            onClick={(event) => props.onClose?.()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </Show>
    </div>
  );
}

export default Toast;
