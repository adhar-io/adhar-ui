// @ts-nocheck
import { Show, on, createEffect, createMemo, createSignal } from "solid-js";

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

import { cn } from "@adhar-ui/utils";
import { dropdownMenuContentVariants } from "./dropdown-menu.styles.ts";
import { buttonVariants } from "../button/button.styles.ts";
import { placementVariants } from "../_internal/placement.styles.ts";
import { rovingFocus } from "../_internal/dom.ts";

function DropdownMenu(props: DropdownMenuProps) {
  const [internalOpen, setInternalOpen] = createSignal(false);

  const [inst, setInst] = createSignal({
    focusLast: false,
  });

  const isOpen = createMemo(() => {
    return props.open !== undefined ? !!props.open : internalOpen();
  });

  const resolvedSide = createMemo(() => {
    return props.side || "bottom";
  });

  const menuId = createMemo(() => {
    return props.id ? props.id + "-menu" : undefined;
  });

  const rootClasses = createMemo(() => {
    return cn("relative inline-block", props.className);
  });

  const triggerClasses = createMemo(() => {
    return props.triggerClass === undefined
      ? buttonVariants({
          variant: "outline",
        })
      : props.triggerClass;
  });

  const contentClasses = createMemo(() => {
    return cn(
      placementVariants({
        side: resolvedSide(),
        align: props.align || "start",
      }),
      dropdownMenuContentVariants(),
      props.contentClass
    );
  });

  function setOpen(next: boolean, restoreFocus: boolean) {
    if (next && props.disabled) return;
    setInternalOpen(next);
    props.onOpenChange?.(next);
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
      inst().focusLast = event.key === "ArrowUp";
      if (isOpen()) focusItem(inst().focusLast);
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
      loop: props.loop !== false,
    });
  }

  function handleContentClick(event: any) {
    const item = event.target.closest
      ? event.target.closest('[role="menuitem"]')
      : null;
    if (!item || item.getAttribute("aria-disabled") === "true") return;
    if (props.closeOnSelect !== false) setOpen(false, true);
  }

  let triggerRef: HTMLButtonElement;
  let contentRef: HTMLDivElement;

  setInternalOpen(!!props.defaultOpen);

  const onUpdateFn_0_isOpen__ = createMemo(() => isOpen());
  function onUpdateFn_0() {
    if (isOpen()) {
      const last = inst().focusLast;
      inst().focusLast = false;
      setTimeout(() => focusItem(last));
    }
  }
  createEffect(on(() => [onUpdateFn_0_isOpen__()], onUpdateFn_0));

  return (
    <div class={rootClasses()} data-state={isOpen() ? "open" : "closed"}>
      <button
        class={triggerClasses()}
        type="button"
        aria-haspopup="menu"
        ref={triggerRef!}
        disabled={props.disabled}
        aria-label={props.triggerLabel}
        aria-expanded={isOpen()}
        aria-controls={isOpen() ? menuId() : undefined}
        data-state={isOpen() ? "open" : "closed"}
        onClick={(event) => setOpen(!isOpen(), false)}
        onKeyDown={(event) => handleTriggerKeyDown(event)}
      >
        {props.trigger}
      </button>
      <Show when={isOpen()}>
        <div
          class="fixed inset-0 z-40"
          aria-hidden="true"
          onClick={(event) => setOpen(false, true)}
        ></div>
        <div
          class={contentClasses()}
          role="menu"
          aria-orientation="vertical"
          data-state="open"
          ref={contentRef!}
          id={menuId()}
          data-side={resolvedSide()}
          tabIndex={-1}
          onKeyDown={(event) => handleContentKeyDown(event)}
          onClick={(event) => handleContentClick(event)}
        >
          {props.children}
        </div>
      </Show>
    </div>
  );
}

export default DropdownMenu;
