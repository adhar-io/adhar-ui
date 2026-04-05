// @ts-nocheck
<script context="module" lang="ts">
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
</script>

<script lang="ts">
  export let className: PopoverProps["className"];
  export let triggerClass: PopoverProps["triggerClass"];
  export let trigger: PopoverProps["trigger"];
  export let contentClass: PopoverProps["contentClass"];

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
  <button
    type="button"
    aria-haspopup="dialog"
    aria-expanded={state.isOpen}
    on:click={(event) => {
      state.toggle();
    }}
    class={triggerClass}>{trigger}</button
  >
  {#if state.isOpen}
    <div
      role="dialog"
      on:keydown={(event) => {
        state.handleKeyDown(event);
      }}
      tabIndex={-1}
      class={contentClass}
    >
      <slot />
    </div>
  {/if}
</div>