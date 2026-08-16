// @ts-nocheck
import { useLocalProxy } from "../../../../runtime.ts";
"use client";
import * as React from "react";

export interface PopoverProps {
  open?: boolean;
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  side?: "top" | "right" | "bottom" | "left";
  onOpenChange?: (open: boolean) => void;
  trigger?: any;
  children?: any;
}

function Popover(props: PopoverProps) {
  const state = useLocalProxy({
    isOpen: null,
    toggle: null,
    handleKeyDown: null,
  });

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
      className={props.className}
    >
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={state.isOpen}
        onClick={(event) => state.toggle()}
        className={props.triggerClass}
      >
        {props.trigger}
      </button>
      {state.isOpen ? (
        <div
          role="dialog"
          onKeyDown={(event) => state.handleKeyDown(event)}
          tabIndex={-1}
          className={props.contentClass}
        >
          {props.children}
        </div>
      ) : null}
    </div>
  );
}

export default Popover;
