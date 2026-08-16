// @ts-nocheck
import { Show } from "solid-js";

export interface TooltipProps {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  delay?: number;
  children?: any;
}

function Tooltip(props: TooltipProps) {
  return (
    <div
      class={props.className}
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <div
        class={props.triggerClass}
        onMouseEnter={(event) => handleMouseEnter()}
        onMouseLeave={(event) => handleMouseLeave()}
        onFocus={(event) => handleFocus()}
        onBlur={(event) => handleBlur()}
        aria-describedby={visible ? "tooltip-content" : undefined}
      >
        {props.children}
      </div>
      <Show when={visible}>
        <div class={props.contentClass} id="tooltip-content" role="tooltip">
          {props.content}
        </div>
      </Show>
    </div>
  );
}

export default Tooltip;
