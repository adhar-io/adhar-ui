"use client";
import * as React from "react";

export interface TabsTriggerProps {
  value: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  /** Give the trigger an id and pass it to TabsContent `aria-labelledby` */
  id?: string;
  /** ID of the TabsContent this trigger shows */
  "aria-controls"?: string;
  onClick?: (value: string) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { tabsTriggerVariants } from "./tabs.styles.ts";

function TabsTrigger(props: TabsTriggerProps) {
  function classes() {
    return cn(tabsTriggerVariants(), props.className);
  }

  return (
    <button
      type="button"
      role="tab"
      id={props.id}
      aria-selected={props.active ? true : false}
      aria-controls={props["aria-controls"]}
      disabled={props.disabled}
      tabIndex={props.active ? 0 : -1}
      data-value={props.value}
      data-state={props.active ? "active" : "inactive"}
      onClick={(event) => props.onClick?.(props.value)}
      className={classes()}
    >
      {props.children}
    </button>
  );
}

export default TabsTrigger;
