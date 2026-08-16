// @ts-nocheck
import { Show } from "solid-js";

export interface PopoverProps {
  open?: boolean;
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  side?: "top" | "right" | "bottom" | "left";
  onOpenChange?: (open: boolean) => void;
  trigger?: any;
  children?: any;
}

function Popover(props: PopoverProps) {
  return (
    <div
      class={props.className}
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <button
        class={props.triggerClass}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={(event) => toggle()}
      >
        {props.trigger}
      </button>
      <Show when={isOpen}>
        <div
          class={props.contentClass}
          role="dialog"
          onKeyDown={(event) => handleKeyDown(event)}
          tabIndex={-1}
        >
          {props.children}
        </div>
      </Show>
    </div>
  );
}

export default Popover;
