// @ts-nocheck
<script context="module" lang="ts">
  export interface DropdownMenuProps {
    open?: boolean;
    className?: string;
    triggerClass?: string;
    contentClass?: string;
    onOpenChange?: (open: boolean) => void;
    trigger?: any;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: DropdownMenuProps["className"];
  export let triggerClass: DropdownMenuProps["triggerClass"];
  export let trigger: DropdownMenuProps["trigger"];
  export let contentClass: DropdownMenuProps["contentClass"];

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
    aria-haspopup="menu"
    aria-expanded={state.isOpen}
    on:click={(event) => {
      state.toggle();
    }}
    class={triggerClass}>{trigger}</button
  >
  {#if state.isOpen}
    <div
      role="menu"
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