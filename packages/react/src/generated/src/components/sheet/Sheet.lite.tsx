// @ts-nocheck
import { useLocalProxy } from "../../../../runtime.ts";
"use client";
import * as React from "react";

export interface SheetProps {
  open?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  overlayClass?: string;
  contentClass?: string;
  onClose?: () => void;
  children?: any;
}

function Sheet(props: SheetProps) {
  const state = useLocalProxy({
    handleOverlayClick: null,
    handleKeyDown: null,
  });

  return (
    <div>
      {props.open ? (
        <div
          onClick={(event) => state.handleOverlayClick(event)}
          onKeyDown={(event) => state.handleKeyDown(event)}
          className={props.overlayClass}
        >
          <div
            role="dialog"
            aria-modal="true"
            data-side={props.side || "right"}
            tabIndex={-1}
            className={props.contentClass}
          >
            {props.children}
            <button
              type="button"
              aria-label="Close"
              onClick={(event) => props.onClose?.()}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Sheet;
