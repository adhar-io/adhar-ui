// @ts-nocheck
<script context="module" lang="ts">
  export interface ToastProps {
    open?: boolean;
    variant?: "default" | "destructive" | "success";
    className?: string;
    titleClass?: string;
    descriptionClass?: string;
    closeClass?: string;
    title?: string;
    description?: string;
    duration?: number;
    onClose?: () => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: ToastProps["className"];
  export let title: ToastProps["title"];
  export let titleClass: ToastProps["titleClass"];
  export let description: ToastProps["description"];
  export let descriptionClass: ToastProps["descriptionClass"];

  export let onClose: ToastProps["onClose"];
  export let closeClass: ToastProps["closeClass"];
</script>

<div>
  {#if state.isOpen}
    <div role="status" aria-live="polite" aria-atomic="true" class={className}>
      <div>
        {#if title}
          <div class={titleClass}>{title}</div>
        {/if}
        {#if description}
          <div class={descriptionClass}>{description}</div>
        {/if}<slot />
      </div>
      <button
        type="button"
        aria-label="Close"
        on:click={(event) => {
          onClose?.();
        }}
        class={closeClass}><span aria-hidden="true">&times;</span></button
      >
    </div>
  {/if}
</div>