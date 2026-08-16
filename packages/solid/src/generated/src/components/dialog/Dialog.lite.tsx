// @ts-nocheck
import { Show } from "solid-js";

export interface DialogProps {
  open?: boolean;
  className?: string;
  overlayClass?: string;
  contentClass?: string;
  onClose?: () => void;
  children?: any;
}

function Dialog(props: DialogProps) {
  return (
    <div>
      <Show when={props.open}>
        <div
          class={props.overlayClass}
          onClick={(event) => handleOverlayClick(event)}
          onKeyDown={(event) => handleKeyDown(event)}
        >
          <div
            class={props.contentClass}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            {props.children}
          </div>
        </div>
      </Show>
    </div>
  );
}

export default Dialog;
