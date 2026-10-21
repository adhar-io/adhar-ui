"use client";
import * as React from "react";
import { useState, useRef, useEffect } from "react";

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

function Dialog(props: DialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(() => false);

  const [inst, setInst] = useState(() => ({
    wasOpen: false,
    restoreTo: null as HTMLElement | null,
  }));

  function isOpen() {
    return props.open !== undefined ? !!props.open : internalOpen;
  }

  function overlayClasses() {
    return cn(dialogOverlayVariants(), props.overlayClass);
  }

  function contentClasses() {
    return cn(
      dialogContentVariants({
        size: props.size,
      }),
      props.contentClass,
      props.className
    );
  }

  function closeClasses() {
    return cn(dialogCloseVariants());
  }

  function requestClose() {
    setInternalOpen(false);
    props.onClose?.();
    props.onOpenChange?.(false);
  }

  function handleOverlayClick(event: any) {
    if (
      event.target === event.currentTarget &&
      props.closeOnOverlayClick !== false
    ) {
      requestClose();
    }
  }

  function handleKeyDown(event: any) {
    if (event.key === "Escape" && props.closeOnEscape !== false) {
      event.stopPropagation();
      requestClose();
      return;
    }
    trapTab(event, contentRef.current);
  }

  function syncOpen() {
    if (typeof document === "undefined") return;
    if (isOpen() && !inst.wasOpen) {
      inst.wasOpen = true;
      inst.restoreTo = document.activeElement as HTMLElement;
      lockBodyScroll();
      setTimeout(() => focusInto(contentRef.current));
    } else if (!isOpen() && inst.wasOpen) {
      inst.wasOpen = false;
      unlockBodyScroll();
      const target = inst.restoreTo;
      inst.restoreTo = null;
      if (target && target.focus) setTimeout(() => target.focus());
    }
  }

  const hasInitialized = useRef(false);
  if (!hasInitialized.current) {
    setInternalOpen(!!props.defaultOpen);
    hasInitialized.current = true;
  }

  useEffect(() => {
    syncOpen();
  }, [isOpen()]);
  useEffect(() => {
    return () => {
      if (inst.wasOpen) {
        inst.wasOpen = false;
        unlockBodyScroll();
      }
    };
  }, []);

  return (
    <>
      {isOpen() ? (
        <>
          <div
            data-state="open"
            onClick={(event) => handleOverlayClick(event)}
            onKeyDown={(event) => handleKeyDown(event)}
            className={overlayClasses()}
          >
            <div
              aria-modal="true"
              data-state="open"
              ref={contentRef}
              id={props.id}
              role={props.role || "dialog"}
              aria-labelledby={props["aria-labelledby"]}
              aria-describedby={props["aria-describedby"]}
              aria-label={props["aria-label"]}
              tabIndex={-1}
              className={contentClasses()}
            >
              {props.children}
              {props.showClose !== false ? (
                <button
                  type="button"
                  aria-label={props.closeLabel || "Close"}
                  onClick={(event) => requestClose()}
                  className={closeClasses()}
                >
                  <svg
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
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Dialog;
