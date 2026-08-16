// @ts-nocheck
"use client";
import * as React from "react";

export interface ToggleGroupItemProps {
  /** The value this item represents within its group */
  value: string;
  /** Whether this item is currently pressed/on */
  pressed?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  /** Fired with this item's value when activated */ onToggle?: (
    value: string
  ) => void;
  children?: any;
}
function ToggleGroupItem(props: ToggleGroupItemProps) {
  return (
    <button
      type="button"
      id={props.id}
      value={props.value}
      aria-pressed={props.pressed ? true : false}
      aria-label={props["aria-label"]}
      data-state={props.pressed ? "on" : "off"}
      disabled={props.disabled}
      onClick={(event) =>
        props.disabled ? undefined : props.onToggle?.(props.value)
      }
      className={props.className}
    >
      {props.children}
    </button>
  );
}
export default ToggleGroupItem;
