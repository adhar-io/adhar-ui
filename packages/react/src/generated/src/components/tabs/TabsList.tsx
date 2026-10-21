"use client";
import * as React from "react";
import { useRef } from "react";

export interface TabsListProps {
  orientation?: "horizontal" | "vertical";
  /** Stretch the list and its triggers to the container width */
  fullWidth?: boolean;
  /**
   * ’automatic’ (default) selects a tab as soon as arrow keys focus it;
   * ’manual’ only moves focus — Enter / Space selects.
   */
  activationMode?: "automatic" | "manual";
  /** Wrap arrow-key navigation from last to first tab (default true) */
  loop?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { tabsListVariants } from "./tabs.styles.ts";
import { rovingFocus } from "../_internal/dom.ts";

function TabsList(props: TabsListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  function classes() {
    return cn(
      tabsListVariants({
        orientation: props.orientation,
        fullWidth: !!props.fullWidth,
      }),
      props.className
    );
  }

  function handleKeyDown(event: any) {
    rovingFocus(event, listRef.current, '[role="tab"]', {
      orientation: props.orientation === "vertical" ? "vertical" : "horizontal",
      loop: props.loop !== false,
      activate: props.activationMode !== "manual",
    });
  }

  return (
    <div
      role="tablist"
      ref={listRef}
      aria-orientation={props.orientation || "horizontal"}
      aria-label={props["aria-label"]}
      aria-labelledby={props["aria-labelledby"]}
      onKeyDown={(event) => handleKeyDown(event)}
      className={classes()}
    >
      {props.children}
    </div>
  );
}

export default TabsList;
