"use client";
import * as React from "react";
import { useState, useRef, useEffect } from "react";

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
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(() => false);

  function isOpen() {
    return props.open !== undefined ? !!props.open : internalOpen;
  }

  function resolvedSide() {
    return props.side || "bottom";
  }

  function contentId() {
    return props.id ? props.id + "-content" : undefined;
  }

  function rootClasses() {
    return cn("relative inline-block", props.className);
  }

  function triggerClasses() {
    return props.triggerClass === undefined
      ? buttonVariants({
          variant: "outline",
        })
      : props.triggerClass;
  }

  function contentClasses() {
    return cn(
      placementVariants({
        side: resolvedSide(),
        align: props.align,
      }),
      popoverContentVariants(),
      props.contentClass
    );
  }

  function setOpen(next: boolean, restoreFocus: boolean) {
    if (next && props.disabled) return;
    setInternalOpen(next);
    props.onOpenChange?.(next);
    if (!next && restoreFocus && triggerRef.current) triggerRef.current.focus();
  }

  function handleKeyDown(event: any) {
    if (event.key === "Escape" && isOpen()) {
      event.stopPropagation();
      setOpen(false, true);
    }
  }

  function handleFocusOut(event: any) {
    const next = event.relatedTarget;
    if (isOpen() && next && rootRef.current && !rootRef.current.contains(next))
      setOpen(false, false);
  }

  const hasInitialized = useRef(false);
  if (!hasInitialized.current) {
    setInternalOpen(!!props.defaultOpen);
    hasInitialized.current = true;
  }

  useEffect(() => {
    if (isOpen() && props.autoFocus !== false)
      setTimeout(() => focusInto(contentRef.current));
  }, [isOpen()]);

  return (
    <div
      ref={rootRef}
      data-state={isOpen() ? "open" : "closed"}
      onKeyDown={(event) => handleKeyDown(event)}
      onBlur={(event) => handleFocusOut(event)}
      className={rootClasses()}
    >
      <button
        type="button"
        aria-haspopup="dialog"
        ref={triggerRef}
        disabled={props.disabled}
        aria-label={props.triggerLabel}
        aria-expanded={isOpen()}
        aria-controls={isOpen() ? contentId() : undefined}
        data-state={isOpen() ? "open" : "closed"}
        onClick={(event) => setOpen(!isOpen(), false)}
        className={triggerClasses()}
      >
        {props.trigger}
      </button>
      {isOpen() ? (
        <>
          <div
            aria-hidden="true"
            className="fixed inset-0 z-40"
            onClick={(event) => setOpen(false, true)}
          />
          <div
            role="dialog"
            data-state="open"
            ref={contentRef}
            id={contentId()}
            aria-label={props["aria-label"]}
            data-side={resolvedSide()}
            tabIndex={-1}
            className={contentClasses()}
          >
            {props.children}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Popover;
