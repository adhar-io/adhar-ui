// @ts-nocheck
import { useLocalProxy } from "../../../../runtime.ts";
"use client";
import * as React from "react";

export interface DropdownMenuProps {
  open?: boolean;
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  onOpenChange?: (open: boolean) => void;
  trigger?: any;
  children?: any;
}

function DropdownMenu(props: DropdownMenuProps) {
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
        aria-haspopup="menu"
        aria-expanded={state.isOpen}
        onClick={(event) => state.toggle()}
        className={props.triggerClass}
      >
        {props.trigger}
      </button>
      {state.isOpen ? (
        <div
          role="menu"
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

export default DropdownMenu;
