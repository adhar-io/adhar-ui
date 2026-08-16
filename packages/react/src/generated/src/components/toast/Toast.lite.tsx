// @ts-nocheck
import { useLocalProxy } from "../../../../runtime.ts";
"use client";
import * as React from "react";

export interface ToastProps {
  open?: boolean;
  variant?: "default" | "destructive" | "success";
  className?: string;
  titleClass?: string;
  descriptionClass?: string;
  closeClass?: string;
  title?: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
  children?: any;
}

function Toast(props: ToastProps) {
  const state = useLocalProxy({ isOpen: null });

  return (
    <div>
      {state.isOpen ? (
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={props.className}
        >
          <div>
            {props.title ? (
              <div className={props.titleClass}>{props.title}</div>
            ) : null}
            {props.description ? (
              <div className={props.descriptionClass}>{props.description}</div>
            ) : null}
            {props.children}
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={(event) => props.onClose?.()}
            className={props.closeClass}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Toast;
