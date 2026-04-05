// @ts-nocheck
<script context="module" lang="ts">
  export interface SheetProps {
    open?: boolean;
    side?: "top" | "right" | "bottom" | "left";
    className?: string;
    overlayClass?: string;
    contentClass?: string;
    onClose?: () => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let open: SheetProps["open"];
  export let overlayClass: SheetProps["overlayClass"];
  export let side: SheetProps["side"];
  export let contentClass: SheetProps["contentClass"];

  export let onClose: SheetProps["onClose"];
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

<div>
  {#if open}
    <div
      on:click={(event) => {
        state.handleOverlayClick(event);
      }}
      on:keydown={(event) => {
        state.handleKeyDown(event);
      }}
      class={overlayClass}
    >
      <div
        role="dialog"
        aria-modal="true"
        data-side={side || "right"}
        tabIndex={-1}
        class={contentClass}
      >
        <slot /><button
          style={stringifyStyles({
            position: "absolute",
            top: "16px",
            right: "16px",
          })}
          type="button"
          aria-label="Close"
          on:click={(event) => {
            onClose?.();
          }}
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
            ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
          ></button
        >
      </div>
    </div>
  {/if}
</div>