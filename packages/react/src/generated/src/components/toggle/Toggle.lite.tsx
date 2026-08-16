// @ts-nocheck
"use client";
import * as React from "react";

export interface ToggleProps {
  /** Whether the toggle is currently pressed/on (controlled) */
  pressed?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  /** Fired with the next pressed state when activated */
  onPressedChange?: (pressed: boolean) => void;
  children?: any;
}

function Toggle(props: ToggleProps) {
  return (
    <button
      type="button"
      id={props.id}
      aria-pressed={props.pressed ? true : false}
      aria-label={props["aria-label"]}
      data-state={props.pressed ? "on" : "off"}
      disabled={props.disabled}
      onClick={(event) =>
        props.disabled ? undefined : props.onPressedChange?.(!props.pressed)
      }
      className={props.className}
    >
      {props.children}
    </button>
  );
}

export default Toggle;
