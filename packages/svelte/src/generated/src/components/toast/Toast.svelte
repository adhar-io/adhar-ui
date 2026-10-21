<script context="module" lang="ts">
  export interface ToastProps {
    /** Visible unless explicitly false */
    open?: boolean;
    variant?: "default" | "destructive" | "success" | "warning" | "info";
    className?: string;
    titleClass?: string;
    descriptionClass?: string;
    closeClass?: string;
    title?: string;
    description?: string;
    /**
     * Auto-dismiss after this many ms (calls onClose). 0 or omitted keeps the
     * toast open. The timer pauses while hovered or focused.
     */
    duration?: number;
    /** Hide the close button (e.g. when an action closes the toast) */
    hideClose?: boolean;
    /** Accessible label for the close button (default "Close") */
    closeLabel?: string;
    onClose?: () => void;
    /** Actions or extra content below the description */
    children?: any;
  }
</script>

<script lang="ts">
  import { onDestroy } from "svelte";

  import { cn } from "@adhar-ui/utils";
  import {
    toastCloseVariants,
    toastDescriptionVariants,
    toastTitleVariants,
    toastVariants,
  } from "./toast.styles.ts";

  export let duration: ToastProps["duration"] = undefined;
  export let open: ToastProps["open"] = undefined;
  export let variant: ToastProps["variant"] = undefined;
  export let className: ToastProps["className"] = undefined;
  export let titleClass: ToastProps["titleClass"] = undefined;
  export let descriptionClass: ToastProps["descriptionClass"] = undefined;
  export let closeClass: ToastProps["closeClass"] = undefined;
  export let onClose: ToastProps["onClose"] = undefined;
  export let title: ToastProps["title"] = undefined;
  export let description: ToastProps["description"] = undefined;

  export let hideClose: ToastProps["hideClose"] = undefined;
  export let closeLabel: ToastProps["closeLabel"] = undefined;

  function stopTimer() {
    if (inst.timer) clearTimeout(inst.timer);
    inst.timer = 0;
  }
  function startTimer() {
    stopTimer();
    if (!isOpen() || !duration || duration <= 0) return;
    inst.timer = setTimeout(() => {
      inst.timer = 0;
      onClose?.();
    }, duration);
  }
  $: isOpen = () => {
    return open !== false;
  };
  $: isUrgent = () => {
    return variant === "destructive" || variant === "warning";
  };
  $: classes = () => {
    return cn(
      toastVariants({
        variant: variant,
      }),
      className
    );
  };
  $: titleClasses = () => {
    return cn(toastTitleVariants(), titleClass);
  };
  $: descriptionClasses = () => {
    return cn(toastDescriptionVariants(), descriptionClass);
  };
  $: closeClasses = () => {
    return cn(toastCloseVariants(), closeClass);
  };

  let inst = {
    timer: 0 as any,
  };

  function onUpdateFn_0(..._args: any[]) {
    startTimer();
  }

  $: onUpdateFn_0(...[isOpen(), duration]);

  onDestroy(() => {
    stopTimer();
  });
</script>

{#if isOpen()}
  <div
    aria-atomic="true"
    data-state="open"
    role={isUrgent() ? "alert" : "status"}
    aria-live={isUrgent() ? "assertive" : "polite"}
    on:mouseenter={(event) => {
      stopTimer();
    }}
    on:mouseleave={(event) => {
      startTimer();
    }}
    on:focusin={(event) => {
      stopTimer();
    }}
    on:focusout={(event) => {
      startTimer();
    }}
    class={classes()}
  >
    <div class="grid flex-1 gap-1">
      {#if title}
        <div class={titleClasses()}>{title}</div>
      {/if}
      {#if description}
        <div class={descriptionClasses()}>{description}</div>
      {/if}<slot />
    </div>
    {#if !hideClose}
      <button
        type="button"
        aria-label={closeLabel || "Close"}
        on:click={(event) => {
          onClose?.();
        }}
        class={closeClasses()}
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
        ></button
      >
    {/if}
  </div>
{/if}