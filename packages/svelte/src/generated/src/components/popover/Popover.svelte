<script context="module" lang="ts">
  export interface PopoverProps {
    /** Controlled open state */
    open?: boolean;
    /** Initial open state when uncontrolled */
    defaultOpen?: boolean;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    /** Move focus into the content on open (default true) */
    autoFocus?: boolean;
    disabled?: boolean;
    /** Prefix for the content id, wired to the trigger’s aria-controls */
    id?: string;
    className?: string;
    /** Trigger classes. Defaults to an outline button. */
    triggerClass?: string;
    contentClass?: string;
    /** Accessible label for the trigger when its content is an icon */
    triggerLabel?: string;
    /** Accessible label for the popover panel */
    "aria-label"?: string;
    onOpenChange?: (open: boolean) => void;
    /** Content of the trigger button (text or icon — not another button) */
    trigger?: any;
    children?: any;
  }

  // Closes on Escape, on a click outside (via a transparent backdrop, so it needs
  // no document listeners), and when focus tabs out of the popover.
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { popoverContentVariants } from "./popover.styles.ts";
  import { buttonVariants } from "../button/button.styles.ts";
  import { placementVariants } from "../_internal/placement.styles.ts";
  import { focusInto } from "../_internal/dom.ts";

  export let defaultOpen: PopoverProps["defaultOpen"] = undefined;
  export let autoFocus: PopoverProps["autoFocus"] = undefined;
  export let open: PopoverProps["open"] = undefined;
  export let side: PopoverProps["side"] = undefined;
  export let id: PopoverProps["id"] = undefined;
  export let className: PopoverProps["className"] = undefined;
  export let triggerClass: PopoverProps["triggerClass"] = undefined;
  export let align: PopoverProps["align"] = undefined;
  export let contentClass: PopoverProps["contentClass"] = undefined;
  export let disabled: PopoverProps["disabled"] = undefined;
  export let onOpenChange: PopoverProps["onOpenChange"] = undefined;
  export let triggerLabel: PopoverProps["triggerLabel"] = undefined;
  export let trigger: PopoverProps["trigger"] = undefined;

  function setOpen(next: boolean, restoreFocus: boolean) {
    if (next && disabled) return;
    internalOpen = next;
    onOpenChange?.(next);
    if (!next && restoreFocus && triggerRef) triggerRef.focus();
  }
  function handleKeyDown(event: any) {
    if (event.key === "Escape" && isOpen()) {
      event.stopPropagation();
      setOpen(false, true);
    }
  }
  function handleFocusOut(event: any) {
    const next = event.relatedTarget;
    if (isOpen() && next && rootRef && !rootRef.contains(next))
      setOpen(false, false);
  }
  $: isOpen = () => {
    return open !== undefined ? !!open : internalOpen;
  };
  $: resolvedSide = () => {
    return side || "bottom";
  };
  $: contentId = () => {
    return id ? id + "-content" : undefined;
  };
  $: rootClasses = () => {
    return cn("relative inline-block", className);
  };
  $: triggerClasses = () => {
    return triggerClass === undefined
      ? buttonVariants({
          variant: "outline",
        })
      : triggerClass;
  };
  $: contentClasses = () => {
    return cn(
      placementVariants({
        side: resolvedSide(),
        align: align,
      }),
      popoverContentVariants(),
      contentClass
    );
  };

  let rootRef;
  let triggerRef;
  let contentRef;

  let internalOpen = false;
  internalOpen = !!defaultOpen;

  function onUpdateFn_0(..._args: any[]) {
    if (isOpen() && autoFocus !== false)
      setTimeout(() => focusInto(contentRef));
  }

  $: onUpdateFn_0(...[isOpen()]);
</script>

<div
  bind:this={rootRef}
  data-state={isOpen() ? "open" : "closed"}
  on:keydown={(event) => {
    handleKeyDown(event);
  }}
  on:focusout={(event) => {
    handleFocusOut(event);
  }}
  class={rootClasses()}
>
  <button
    type="button"
    aria-haspopup="dialog"
    bind:this={triggerRef}
    {disabled}
    aria-label={triggerLabel}
    aria-expanded={isOpen()}
    aria-controls={isOpen() ? contentId() : undefined}
    data-state={isOpen() ? "open" : "closed"}
    on:click={(event) => {
      setOpen(!isOpen(), false);
    }}
    class={triggerClasses()}>{trigger}</button
  >
  {#if isOpen()}
    <div
      aria-hidden="true"
      class="fixed inset-0 z-40"
      on:click={(event) => {
        setOpen(false, true);
      }}
    />
    <div
      role="dialog"
      data-state="open"
      bind:this={contentRef}
      id={contentId()}
      aria-label={"aria-label"}
      data-side={resolvedSide()}
      tabIndex={-1}
      class={contentClasses()}
    >
      <slot />
    </div>
  {/if}
</div>