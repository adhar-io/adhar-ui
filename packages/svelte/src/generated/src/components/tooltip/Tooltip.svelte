<script context="module" lang="ts">
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
</script>

<script lang="ts">
  import { onDestroy } from "svelte";

  import { cn, generateId } from "@adhar-ui/utils";
  import { tooltipContentVariants } from "./tooltip.styles.ts";
  import { placementVariants } from "../_internal/placement.styles.ts";

  export let id: TooltipProps["id"] = undefined;
  export let side: TooltipProps["side"] = undefined;
  export let className: TooltipProps["className"] = undefined;
  export let align: TooltipProps["align"] = undefined;
  export let contentClass: TooltipProps["contentClass"] = undefined;
  export let disabled: TooltipProps["disabled"] = undefined;
  export let content: TooltipProps["content"];
  export let delay: TooltipProps["delay"] = undefined;
  export let triggerClass: TooltipProps["triggerClass"] = undefined;

  function clearTimer() {
    if (inst.timer) clearTimeout(inst.timer);
    inst.timer = 0;
  }
  function show(immediate: boolean) {
    if (disabled || !content) return;
    clearTimer();
    const delay = delay === undefined ? 300 : delay;
    if (immediate || delay <= 0) {
      visible = true;
    } else {
      inst.timer = setTimeout(() => {
        visible = true;
      }, delay);
    }
  }
  function hide() {
    clearTimer();
    visible = false;
  }
  function handleKeyDown(event: any) {
    if (event.key === "Escape" && visible) {
      event.stopPropagation();
      hide();
    }
  }
  $: tooltipId = () => {
    return id || generatedId;
  };
  $: resolvedSide = () => {
    return side || "top";
  };
  $: rootClasses = () => {
    return cn("relative inline-block", className);
  };
  $: contentClasses = () => {
    return cn(
      placementVariants({
        side: resolvedSide(),
        align: align,
      }),
      tooltipContentVariants(),
      "w-max max-w-xs",
      contentClass
    );
  };

  let visible = false;
  let generatedId = "";
  let inst = {
    timer: 0 as any,
  };
  generatedId = generateId("adhar-tooltip");

  onDestroy(() => {
    clearTimer();
  });
</script>

<div
  on:mouseenter={(event) => {
    show(false);
  }}
  on:mouseleave={(event) => {
    hide();
  }}
  on:keydown={(event) => {
    handleKeyDown(event);
  }}
  class={rootClasses()}
>
  <div
    on:focusin={(event) => {
      show(true);
    }}
    on:focusout={(event) => {
      hide();
    }}
    aria-describedby={visible ? tooltipId() : undefined}
    class={triggerClass}
  >
    <slot />
  </div>
  {#if visible}
    <div
      role="tooltip"
      data-state="open"
      id={tooltipId()}
      data-side={resolvedSide()}
      class={contentClasses()}
    >
      {content}
    </div>
  {/if}
</div>