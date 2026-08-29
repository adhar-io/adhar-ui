// @ts-nocheck
"use client";
import * as React from "react";

export interface CollapsibleTriggerProps {
  open?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  /** ID of the content region this trigger controls */
  "aria-controls"?: string;
  onOpenChange?: (open: boolean) => void;
  children?: any;
}

function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  return (
    <button
      type="button"
      id={props.id}
      disabled={props.disabled}
      aria-expanded={props.open ? true : false}
      aria-controls={props["aria-controls"]}
      data-state={props.open ? "open" : "closed"}
      onClick={(event) =>
        props.disabled ? undefined : props.onOpenChange?.(!props.open)
      }
      className={props.className}
    >
      {props.children}
    </button>
  );
}

export default CollapsibleTrigger;
