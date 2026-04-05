// @ts-nocheck
<script context="module" lang="ts">
  export interface TooltipProps {
    content: string;
    side?: "top" | "right" | "bottom" | "left";
    className?: string;
    triggerClass?: string;
    contentClass?: string;
    delay?: number;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: TooltipProps["className"];
  export let triggerClass: TooltipProps["triggerClass"];

  export let contentClass: TooltipProps["contentClass"];
  export let content: TooltipProps["content"];
  function stringifyStyles(stylesObj) {
    let styles = "";
    for (let key in stylesObj) {
      const dashedKey = key.replace(/[A-Z]/g, function (match) {
        return "-" + match.toLowerCase();
      });
      styles += dashedKey + ":" + stylesObj[key] + ";";
    }
    return styles;
  }
</script>

<div
  style={stringifyStyles({
    position: "relative",
    display: "inline-block",
  })}
  class={className}
>
  <div
    on:mouseenter={(event) => {
      state.handleMouseEnter();
    }}
    on:mouseleave={(event) => {
      state.handleMouseLeave();
    }}
    on:focus={(event) => {
      state.handleFocus();
    }}
    on:blur={(event) => {
      state.handleBlur();
    }}
    aria-describedby={state.visible ? "tooltip-content" : undefined}
    class={triggerClass}
  >
    <slot />
  </div>
  {#if state.visible}
    <div id="tooltip-content" role="tooltip" class={contentClass}>
      {content}
    </div>
  {/if}
</div>