// @ts-nocheck
import { Show, on, createEffect, createMemo, createSignal } from "solid-js";

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

import { cn } from "@adhar-ui/utils";
import { popoverContentVariants } from "./popover.styles.ts";
import { buttonVariants } from "../button/button.styles.ts";
import { placementVariants } from "../_internal/placement.styles.ts";
import { focusInto } from "../_internal/dom.ts";

function Popover(props: PopoverProps) {
  const [internalOpen, setInternalOpen] = createSignal(false);

  const isOpen = createMemo(() => {
    return props.open !== undefined ? !!props.open : internalOpen();
  });

  const resolvedSide = createMemo(() => {
    return props.side || "bottom";
  });

  const contentId = createMemo(() => {
    return props.id ? props.id + "-content" : undefined;
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
        align: props.align,
      }),
      popoverContentVariants(),
      props.contentClass
    );
  });

  function setOpen(next: boolean, restoreFocus: boolean) {
    if (next && props.disabled) return;
    setInternalOpen(next);
    props.onOpenChange?.(next);
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

  let rootRef: HTMLDivElement;
  let triggerRef: HTMLButtonElement;
  let contentRef: HTMLDivElement;

  setInternalOpen(!!props.defaultOpen);

  const onUpdateFn_0_isOpen__ = createMemo(() => isOpen());
  function onUpdateFn_0() {
    if (isOpen() && props.autoFocus !== false)
      setTimeout(() => focusInto(contentRef));
  }
  createEffect(on(() => [onUpdateFn_0_isOpen__()], onUpdateFn_0));

  return (
    <div
      class={rootClasses()}
      ref={rootRef!}
      data-state={isOpen() ? "open" : "closed"}
      onKeyDown={(event) => handleKeyDown(event)}
      onFocusOut={(event) => handleFocusOut(event)}
    >
      <button
        class={triggerClasses()}
        type="button"
        aria-haspopup="dialog"
        ref={triggerRef!}
        disabled={props.disabled}
        aria-label={props.triggerLabel}
        aria-expanded={isOpen()}
        aria-controls={isOpen() ? contentId() : undefined}
        data-state={isOpen() ? "open" : "closed"}
        onClick={(event) => setOpen(!isOpen(), false)}
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
          role="dialog"
          data-state="open"
          ref={contentRef!}
          id={contentId()}
          aria-label={props["aria-label"]}
          data-side={resolvedSide()}
          tabIndex={-1}
        >
          {props.children}
        </div>
      </Show>
    </div>
  );
}

export default Popover;
