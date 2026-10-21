<script context="module" lang="ts">
  export interface DropdownMenuProps {
    /** Controlled open state */
    open?: boolean;
    /** Initial open state when uncontrolled */
    defaultOpen?: boolean;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    /** Close the menu after an item is chosen (default true) */
    closeOnSelect?: boolean;
    /** Wrap arrow-key navigation from last to first item (default true) */
    loop?: boolean;
    disabled?: boolean;
    /** Prefix for the menu id, wired to the trigger’s aria-controls */
    id?: string;
    className?: string;
    /** Trigger classes. Defaults to an outline button. */
    triggerClass?: string;
    contentClass?: string;
    /** Accessible label for the trigger when its content is an icon */
    triggerLabel?: string;
    onOpenChange?: (open: boolean) => void;
    /** Content of the trigger button (text or icon — not another button) */
    trigger?: any;
    children?: any;
  }

  // WAI-ARIA menu button: Enter / Space / ArrowDown open the menu on the first
  // item, ArrowUp on the last; arrows, Home and End move between items; Escape
  // and Tab close it. Outside clicks hit a transparent backdrop.
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { dropdownMenuContentVariants } from "./dropdown-menu.styles.ts";
  import { buttonVariants } from "../button/button.styles.ts";
  import { placementVariants } from "../_internal/placement.styles.ts";
  import { rovingFocus } from "../_internal/dom.ts";

  export let defaultOpen: DropdownMenuProps["defaultOpen"] = undefined;
  export let open: DropdownMenuProps["open"] = undefined;
  export let side: DropdownMenuProps["side"] = undefined;
  export let id: DropdownMenuProps["id"] = undefined;
  export let className: DropdownMenuProps["className"] = undefined;
  export let triggerClass: DropdownMenuProps["triggerClass"] = undefined;
  export let align: DropdownMenuProps["align"] = undefined;
  export let contentClass: DropdownMenuProps["contentClass"] = undefined;
  export let disabled: DropdownMenuProps["disabled"] = undefined;
  export let onOpenChange: DropdownMenuProps["onOpenChange"] = undefined;
  export let loop: DropdownMenuProps["loop"] = undefined;
  export let closeOnSelect: DropdownMenuProps["closeOnSelect"] = undefined;
  export let triggerLabel: DropdownMenuProps["triggerLabel"] = undefined;
  export let trigger: DropdownMenuProps["trigger"] = undefined;

  function setOpen(next: boolean, restoreFocus: boolean) {
    if (next && disabled) return;
    internalOpen = next;
    onOpenChange?.(next);
    if (!next && restoreFocus && triggerRef) triggerRef.focus();
  }
  function focusItem(last: boolean) {
    if (!contentRef) return;
    const items = Array.from(
      contentRef.querySelectorAll(
        '[role="menuitem"]:not([aria-disabled="true"])'
      )
    ) as HTMLElement[];
    const target = last ? items[items.length - 1] : items[0];
    (target || contentRef).focus();
  }
  function handleTriggerKeyDown(event: any) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      inst.focusLast = event.key === "ArrowUp";
      if (isOpen()) focusItem(inst.focusLast);
      else setOpen(true, false);
    }
  }
  function handleContentKeyDown(event: any) {
    if (event.key === "Escape") {
      event.stopPropagation();
      setOpen(false, true);
      return;
    }
    if (event.key === "Tab") {
      setOpen(false, false);
      return;
    }
    rovingFocus(event, contentRef, '[role="menuitem"]', {
      orientation: "vertical",
      loop: loop !== false,
    });
  }
  function handleContentClick(event: any) {
    const item = event.target.closest
      ? event.target.closest('[role="menuitem"]')
      : null;
    if (!item || item.getAttribute("aria-disabled") === "true") return;
    if (closeOnSelect !== false) setOpen(false, true);
  }
  $: isOpen = () => {
    return open !== undefined ? !!open : internalOpen;
  };
  $: resolvedSide = () => {
    return side || "bottom";
  };
  $: menuId = () => {
    return id ? id + "-menu" : undefined;
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
        align: align || "start",
      }),
      dropdownMenuContentVariants(),
      contentClass
    );
  };

  let triggerRef;
  let contentRef;

  let internalOpen = false;
  let inst = {
    focusLast: false,
  };
  internalOpen = !!defaultOpen;

  function onUpdateFn_0(..._args: any[]) {
    if (isOpen()) {
      const last = inst.focusLast;
      inst.focusLast = false;
      setTimeout(() => focusItem(last));
    }
  }

  $: onUpdateFn_0(...[isOpen()]);
</script>

<div data-state={isOpen() ? "open" : "closed"} class={rootClasses()}>
  <button
    type="button"
    aria-haspopup="menu"
    bind:this={triggerRef}
    {disabled}
    aria-label={triggerLabel}
    aria-expanded={isOpen()}
    aria-controls={isOpen() ? menuId() : undefined}
    data-state={isOpen() ? "open" : "closed"}
    on:click={(event) => {
      setOpen(!isOpen(), false);
    }}
    on:keydown={(event) => {
      handleTriggerKeyDown(event);
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
      role="menu"
      aria-orientation="vertical"
      data-state="open"
      bind:this={contentRef}
      id={menuId()}
      data-side={resolvedSide()}
      tabIndex={-1}
      on:keydown={(event) => {
        handleContentKeyDown(event);
      }}
      on:click={(event) => {
        handleContentClick(event);
      }}
      class={contentClasses()}
    >
      <slot />
    </div>
  {/if}
</div>