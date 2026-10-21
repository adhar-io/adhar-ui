// @ts-nocheck
import { Show, on, createEffect, createMemo, createSignal } from "solid-js";

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

function Sheet(props: SheetProps) {
  const [internalOpen, setInternalOpen] = createSignal(false);

  const [inst, setInst] = createSignal({
    wasOpen: false,
    restoreTo: null as HTMLElement | null,
  });

  const isOpen = createMemo(() => {
    return props.open !== undefined ? !!props.open : internalOpen();
  });

  const overlayClasses = createMemo(() => {
    return cn(sheetOverlayVariants(), props.overlayClass);
  });

  const contentClasses = createMemo(() => {
    return cn(
      sheetContentVariants({
        side: props.side,
      }),
      props.contentClass,
      props.className
    );
  });

  const closeClasses = createMemo(() => {
    return cn(sheetCloseVariants());
  });

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
    trapTab(event, contentRef);
  }

  function syncOpen() {
    if (typeof document === "undefined") return;
    if (isOpen() && !inst().wasOpen) {
      inst().wasOpen = true;
      inst().restoreTo = document.activeElement as HTMLElement;
      lockBodyScroll();
      setTimeout(() => focusInto(contentRef));
    } else if (!isOpen() && inst().wasOpen) {
      inst().wasOpen = false;
      unlockBodyScroll();
      const target = inst().restoreTo;
      inst().restoreTo = null;
      if (target && target.focus) setTimeout(() => target.focus());
    }
  }

  let contentRef: HTMLDivElement;

  setInternalOpen(!!props.defaultOpen);

  const onUpdateFn_0_isOpen__ = createMemo(() => isOpen());
  function onUpdateFn_0() {
    syncOpen();
  }
  createEffect(on(() => [onUpdateFn_0_isOpen__()], onUpdateFn_0));

  return (
    <Show when={isOpen()}>
      <div
        class={overlayClasses()}
        data-state="open"
        onClick={(event) => handleOverlayClick(event)}
        onKeyDown={(event) => handleKeyDown(event)}
      >
        <div
          class={contentClasses()}
          aria-modal="true"
          data-state="open"
          ref={contentRef!}
          id={props.id}
          role={props.role || "dialog"}
          aria-labelledby={props["aria-labelledby"]}
          aria-describedby={props["aria-describedby"]}
          aria-label={props["aria-label"]}
          data-side={props.side || "right"}
          tabIndex={-1}
        >
          {props.children}
          <Show when={props.showClose !== false}>
            <button
              class={closeClasses()}
              type="button"
              aria-label={props.closeLabel || "Close"}
              onClick={(event) => requestClose()}
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
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </Show>
        </div>
      </div>
    </Show>
  );
}

export default Sheet;
