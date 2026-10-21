"use client";
import * as React from "react";

export interface DropdownMenuItemProps {
  disabled?: boolean;
  /** "destructive" for delete-style actions */
  variant?: "default" | "destructive";
  /** Indent to line up with items that have a leading icon */
  inset?: boolean;
  className?: string;
  onClick?: () => void;
  /** Alias of `onClick` */
  onSelect?: () => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { dropdownMenuItemVariants } from "./dropdown-menu.styles.ts";

function DropdownMenuItem(props: DropdownMenuItemProps) {
  function classes() {
    return cn(
      dropdownMenuItemVariants({
        variant: props.variant,
        inset: !!props.inset,
      }),
      props.className
    );
  }

  function activate() {
    if (props.disabled) return;
    props.onClick?.();
    props.onSelect?.();
  }

  function handleKeyDown(event: any) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      /* Route through click so DropdownMenu sees it and closes. */
      if (!props.disabled) event.currentTarget.click();
    }
  }

  return (
    <div
      role="menuitem"
      tabIndex={-1}
      aria-disabled={props.disabled ? true : undefined}
      data-disabled={props.disabled ? "" : undefined}
      onClick={(event) => activate()}
      onKeyDown={(event) => handleKeyDown(event)}
      className={classes()}
    >
      {props.children}
    </div>
  );
}

export default DropdownMenuItem;
