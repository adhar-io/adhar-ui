// @ts-nocheck
"use client";
import * as React from "react";

export interface CommandItemProps {
  /** The value this item represents (passed to onSelect) */
  value?: string;
  /** Whether this item is the active/highlighted option */
  selected?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  onSelect?: (value: string) => void;
  children?: any;
}

function CommandItem(props: CommandItemProps) {
  return (
    <div
      role="option"
      id={props.id}
      tabIndex={-1}
      aria-selected={props.selected ? true : false}
      aria-disabled={props.disabled ? true : false}
      data-selected={props.selected ? "true" : "false"}
      onClick={(event) =>
        props.disabled ? undefined : props.onSelect?.(props.value || "")
      }
      className={props.className}
    >
      {props.children}
    </div>
  );
}

export default CommandItem;
