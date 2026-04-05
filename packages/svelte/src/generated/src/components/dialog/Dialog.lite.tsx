// @ts-nocheck
<script context="module" lang="ts">
  export interface DialogProps {
    open?: boolean;
    className?: string;
    overlayClass?: string;
    contentClass?: string;
    onClose?: () => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let open: DialogProps["open"];
  export let overlayClass: DialogProps["overlayClass"];
  export let contentClass: DialogProps["contentClass"];
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
      <div role="dialog" aria-modal="true" tabIndex={-1} class={contentClass}>
        <slot />
      </div>
    </div>
  {/if}
</div>