// @ts-nocheck
import { Show } from "solid-js";

export interface DropdownMenuProps {
  open?: boolean;
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  onOpenChange?: (open: boolean) => void;
  trigger?: any;
  children?: any;
}

function DropdownMenu(props: DropdownMenuProps) {
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
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={(event) => toggle()}
      >
        {props.trigger}
      </button>
      <Show when={isOpen}>
        <div
          class={props.contentClass}
          role="menu"
          onKeyDown={(event) => handleKeyDown(event)}
          tabIndex={-1}
        >
          {props.children}
        </div>
      </Show>
    </div>
  );
}

export default DropdownMenu;
