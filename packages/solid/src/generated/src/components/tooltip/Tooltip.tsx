// @ts-nocheck
import { Show, createSignal, createMemo } from "solid-js";

export interface TooltipProps {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  /** Hover delay in ms before showing (default 300). Keyboard focus shows immediately. */
  delay?: number;
  /** Suppress the tooltip (e.g. while a menu it labels is open) */
  disabled?: boolean;
  /** Content id; generated when omitted */
  id?: string;
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  children?: any;
}

// Shows on hover (after `delay`) and on keyboard focus, hides on Escape. The
// pointer can move onto the tooltip without it closing (WCAG 1.4.13).

import { cn, generateId } from "@adhar-ui/utils";
import { tooltipContentVariants } from "./tooltip.styles.ts";
import { placementVariants } from "../_internal/placement.styles.ts";

function Tooltip(props: TooltipProps) {
  const [visible, setVisible] = createSignal(false);

  const [generatedId, setGeneratedId] = createSignal("");

  const [inst, setInst] = createSignal({
    timer: 0 as any,
  });

  const tooltipId = createMemo(() => {
    return props.id || generatedId();
  });

  const resolvedSide = createMemo(() => {
    return props.side || "top";
  });

  const rootClasses = createMemo(() => {
    return cn("relative inline-block", props.className);
  });

  const contentClasses = createMemo(() => {
    return cn(
      placementVariants({
        side: resolvedSide(),
        align: props.align,
      }),
      tooltipContentVariants(),
      "w-max max-w-xs",
      props.contentClass
    );
  });

  function clearTimer() {
    if (inst().timer) clearTimeout(inst().timer);
    inst().timer = 0;
  }

  function show(immediate: boolean) {
    if (props.disabled || !props.content) return;
    clearTimer();
    const delay = props.delay === undefined ? 300 : props.delay;
    if (immediate || delay <= 0) {
      setVisible(true);
    } else {
      inst().timer = setTimeout(() => {
        setVisible(true);
      }, delay);
    }
  }

  function hide() {
    clearTimer();
    setVisible(false);
  }

  function handleKeyDown(event: any) {
    if (event.key === "Escape" && visible()) {
      event.stopPropagation();
      hide();
    }
  }

  setGeneratedId(generateId("adhar-tooltip"));

  return (
    <div
      class={rootClasses()}
      onMouseEnter={(event) => show(false)}
      onMouseLeave={(event) => hide()}
      onKeyDown={(event) => handleKeyDown(event)}
    >
      <div
        class={props.triggerClass}
        onFocusIn={(event) => show(true)}
        onFocusOut={(event) => hide()}
        aria-describedby={visible() ? tooltipId() : undefined}
      >
        {props.children}
      </div>
      <Show when={visible()}>
        <div
          class={contentClasses()}
          role="tooltip"
          data-state="open"
          id={tooltipId()}
          data-side={resolvedSide()}
        >
          {props.content}
        </div>
      </Show>
    </div>
  );
}

export default Tooltip;
