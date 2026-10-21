<script context="module" lang="ts">
  export interface DialogProps {
    /** Controlled open state */
    open?: boolean;
    /** Initial open state when uncontrolled */
    defaultOpen?: boolean;
    size?: "sm" | "default" | "lg" | "xl" | "full";
    /** "alertdialog" for confirmations that need an explicit choice */
    role?: "dialog" | "alertdialog";
    /** Close when the backdrop is clicked (default true) */
    closeOnOverlayClick?: boolean;
    /** Close on Escape (default true) */
    closeOnEscape?: boolean;
    /** Render the top-right close button (default true) */
    showClose?: boolean;
    /** Accessible label for the close button (default "Close") */
    closeLabel?: string;
    /** ID of the DialogTitle — announced when the dialog opens */
    "aria-labelledby"?: string;
    /** ID of the DialogDescription */
    "aria-describedby"?: string;
    /** Label when there is no visible title */
    "aria-label"?: string;
    id?: string;
    className?: string;
    overlayClass?: string;
    /** Classes for the dialog panel (alias of className) */
    contentClass?: string;
    /** Fires when the dialog asks to close (Escape, backdrop, close button) */
    onClose?: () => void;
    /** Fires with the next open state */
    onOpenChange?: (open: boolean) => void;
    children?: any;
  }

  // Focus moves into the dialog on open (the first [data-autofocus] element, else
  // the first focusable one) and returns to the previously focused element on
  // close. Tab is trapped inside and page scroll is locked while open.
</script>

<script lang="ts">
  import { onDestroy } from "svelte";

  import { cn } from "@adhar-ui/utils";
  import {
    dialogCloseVariants,
    dialogContentVariants,
    dialogOverlayVariants,
  } from "./dialog.styles.ts";
  import {
    focusInto,
    lockBodyScroll,
    trapTab,
    unlockBodyScroll,
  } from "../_internal/dom.ts";

  export let defaultOpen: DialogProps["defaultOpen"] = undefined;
  export let open: DialogProps["open"] = undefined;
  export let overlayClass: DialogProps["overlayClass"] = undefined;
  export let size: DialogProps["size"] = undefined;
  export let contentClass: DialogProps["contentClass"] = undefined;
  export let className: DialogProps["className"] = undefined;
  export let onClose: DialogProps["onClose"] = undefined;
  export let onOpenChange: DialogProps["onOpenChange"] = undefined;
  export let closeOnOverlayClick: DialogProps["closeOnOverlayClick"] =
    undefined;
  export let closeOnEscape: DialogProps["closeOnEscape"] = undefined;
  export let id: DialogProps["id"] = undefined;
  export let role: DialogProps["role"] = undefined;

  export let showClose: DialogProps["showClose"] = undefined;
  export let closeLabel: DialogProps["closeLabel"] = undefined;

  function requestClose() {
    internalOpen = false;
    onClose?.();
    onOpenChange?.(false);
  }
  function handleOverlayClick(event: any) {
    if (event.target === event.currentTarget && closeOnOverlayClick !== false) {
      requestClose();
    }
  }
  function handleKeyDown(event: any) {
    if (event.key === "Escape" && closeOnEscape !== false) {
      event.stopPropagation();
      requestClose();
      return;
    }
    trapTab(event, contentRef);
  }
  function syncOpen() {
    if (typeof document === "undefined") return;
    if (isOpen() && !inst.wasOpen) {
      inst.wasOpen = true;
      inst.restoreTo = document.activeElement as HTMLElement;
      lockBodyScroll();
      setTimeout(() => focusInto(contentRef));
    } else if (!isOpen() && inst.wasOpen) {
      inst.wasOpen = false;
      unlockBodyScroll();
      const target = inst.restoreTo;
      inst.restoreTo = null;
      if (target && target.focus) setTimeout(() => target.focus());
    }
  }
  $: isOpen = () => {
    return open !== undefined ? !!open : internalOpen;
  };
  $: overlayClasses = () => {
    return cn(dialogOverlayVariants(), overlayClass);
  };
  $: contentClasses = () => {
    return cn(
      dialogContentVariants({
        size: size,
      }),
      contentClass,
      className
    );
  };
  $: closeClasses = () => {
    return cn(dialogCloseVariants());
  };

  let contentRef;

  let internalOpen = false;
  let inst = {
    wasOpen: false,
    restoreTo: null as HTMLElement | null,
  };
  internalOpen = !!defaultOpen;

  function onUpdateFn_0(..._args: any[]) {
    syncOpen();
  }

  $: onUpdateFn_0(...[isOpen()]);

  onDestroy(() => {
    if (inst.wasOpen) {
      inst.wasOpen = false;
      unlockBodyScroll();
    }
  });
</script>

{#if isOpen()}
  <div
    data-state="open"
    on:click={(event) => {
      handleOverlayClick(event);
    }}
    on:keydown={(event) => {
      handleKeyDown(event);
    }}
    class={overlayClasses()}
  >
    <div
      aria-modal="true"
      data-state="open"
      bind:this={contentRef}
      {id}
      role={role || "dialog"}
      aria-labelledby={"aria-labelledby"}
      aria-describedby={"aria-describedby"}
      aria-label={"aria-label"}
      tabIndex={-1}
      class={contentClasses()}
    >
      <slot />
      {#if showClose !== false}
        <button
          type="button"
          aria-label={closeLabel || "Close"}
          on:click={(event) => {
            requestClose();
          }}
          class={closeClasses()}
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            ><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
          ></button
        >
      {/if}
    </div>
  </div>
{/if}