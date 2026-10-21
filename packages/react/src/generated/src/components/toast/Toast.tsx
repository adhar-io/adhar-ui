"use client";
import * as React from "react";
import { useState, useEffect } from "react";

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

import { cn } from "@adhar-ui/utils";
import {
  toastCloseVariants,
  toastDescriptionVariants,
  toastTitleVariants,
  toastVariants,
} from "./toast.styles.ts";

function Toast(props: ToastProps) {
  const [inst, setInst] = useState(() => ({
    timer: 0 as any,
  }));

  function isOpen() {
    return props.open !== false;
  }

  function isUrgent() {
    return props.variant === "destructive" || props.variant === "warning";
  }

  function classes() {
    return cn(
      toastVariants({
        variant: props.variant,
      }),
      props.className
    );
  }

  function titleClasses() {
    return cn(toastTitleVariants(), props.titleClass);
  }

  function descriptionClasses() {
    return cn(toastDescriptionVariants(), props.descriptionClass);
  }

  function closeClasses() {
    return cn(toastCloseVariants(), props.closeClass);
  }

  function stopTimer() {
    if (inst.timer) clearTimeout(inst.timer);
    inst.timer = 0;
  }

  function startTimer() {
    stopTimer();
    if (!isOpen() || !props.duration || props.duration <= 0) return;
    inst.timer = setTimeout(() => {
      inst.timer = 0;
      props.onClose?.();
    }, props.duration);
  }

  useEffect(() => {
    startTimer();
  }, [isOpen(), props.duration]);
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <>
      {isOpen() ? (
        <>
          <div
            aria-atomic="true"
            data-state="open"
            role={isUrgent() ? "alert" : "status"}
            aria-live={isUrgent() ? "assertive" : "polite"}
            onMouseEnter={(event) => stopTimer()}
            onMouseLeave={(event) => startTimer()}
            onFocus={(event) => stopTimer()}
            onBlur={(event) => startTimer()}
            className={classes()}
          >
            <div className="grid flex-1 gap-1">
              {props.title ? (
                <div className={titleClasses()}>{props.title}</div>
              ) : null}
              {props.description ? (
                <div className={descriptionClasses()}>{props.description}</div>
              ) : null}
              {props.children}
            </div>
            {!props.hideClose ? (
              <button
                type="button"
                aria-label={props.closeLabel || "Close"}
                onClick={(event) => props.onClose?.()}
                className={closeClasses()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
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
        </>
      ) : null}
    </>
  );
}

export default Toast;
