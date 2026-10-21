"use client";
import * as React from "react";

export interface CommandItemProps {
  /** The value this item represents (passed to onSelect / onHighlightChange) */
  value?: string;
  /** Whether this item is the active/highlighted option */
  selected?: boolean;
  disabled?: boolean;
  /** Set an id to reference it from CommandInput `aria-activedescendant` */
  id?: string;
  className?: string;
  onSelect?: (value: string) => void;
  /** Fires on pointer hover, so mouse and keyboard share one highlight */
  onHighlight?: (value: string) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { commandItemVariants } from "./command.styles.ts";

function CommandItem(props: CommandItemProps) {
  function classes() {
    return cn(commandItemVariants(), props.className);
  }

  return (
    <div
      role="option"
      id={props.id}
      tabIndex={-1}
      aria-selected={props.selected ? true : false}
      aria-disabled={props.disabled ? true : undefined}
      data-selected={props.selected ? "true" : "false"}
      data-disabled={props.disabled ? "" : undefined}
      data-value={props.value}
      onClick={(event) =>
        props.disabled ? undefined : props.onSelect?.(props.value || "")
      }
      onMouseEnter={(event) =>
        props.disabled ? undefined : props.onHighlight?.(props.value || "")
      }
      className={classes()}
    >
      {props.children}
    </div>
  );
}

export default CommandItem;
