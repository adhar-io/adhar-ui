<script context="module" lang="ts">
  export interface SheetProps {
    /** Controlled open state */
    open?: boolean;
    /** Initial open state when uncontrolled */
    defaultOpen?: boolean;
    /** Edge the panel slides in from (default "right") */
    side?: "top" | "right" | "bottom" | "left";
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
    /** ID of the sheet’s title — announced when the dialog opens */
    "aria-labelledby"?: string;
    /** ID of the sheet’s description */
    "aria-describedby"?: string;
    /** Label when there is no visible title */
    "aria-label"?: string;
    id?: string;
    className?: string;
    overlayClass?: string;
    /** Classes for the sheet panel (alias of className) */
    contentClass?: string;
    /** Fires when the sheet asks to close (Escape, backdrop, close button) */
    onClose?: () => void;
    /** Fires with the next open state */
    onOpenChange?: (open: boolean) => void;
    children?: any;
  }

  // A dialog anchored to a screen edge. Same focus, Escape and scroll-lock
  // behaviour as Dialog.
</script>

<script lang="ts">
  import { onDestroy } from "svelte";

  import { cn } from "@adhar-ui/utils";
  import {
    sheetCloseVariants,
    sheetContentVariants,
    sheetOverlayVariants,
  } from "./sheet.styles.ts";
  import {
    focusInto,
    lockBodyScroll,
    trapTab,
    unlockBodyScroll,
  } from "../_internal/dom.ts";

  export let defaultOpen: SheetProps["defaultOpen"] = undefined;
  export let open: SheetProps["open"] = undefined;
  export let overlayClass: SheetProps["overlayClass"] = undefined;
  export let side: SheetProps["side"] = undefined;
  export let contentClass: SheetProps["contentClass"] = undefined;
  export let className: SheetProps["className"] = undefined;
  export let onClose: SheetProps["onClose"] = undefined;
  export let onOpenChange: SheetProps["onOpenChange"] = undefined;
  export let closeOnOverlayClick: SheetProps["closeOnOverlayClick"] = undefined;
  export let closeOnEscape: SheetProps["closeOnEscape"] = undefined;
  export let id: SheetProps["id"] = undefined;
  export let role: SheetProps["role"] = undefined;

  export let showClose: SheetProps["showClose"] = undefined;
  export let closeLabel: SheetProps["closeLabel"] = undefined;

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
    return cn(sheetOverlayVariants(), overlayClass);
  };
  $: contentClasses = () => {
    return cn(
      sheetContentVariants({
        side: side,
      }),
      contentClass,
      className
    );
  };
  $: closeClasses = () => {
    return cn(sheetCloseVariants());
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
      data-side={side || "right"}
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