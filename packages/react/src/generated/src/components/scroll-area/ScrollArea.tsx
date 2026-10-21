import * as React from "react";

export interface ScrollAreaProps {
  orientation?: "vertical" | "horizontal" | "both";
  /** Max height of the scroll viewport, e.g. "20rem" or 320 (px) */
  maxHeight?: string | number;
  className?: string;
  /** Adds tabindex so keyboard users can scroll the region. Requires `aria-label`. */
  focusable?: boolean;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { scrollAreaVariants } from "./scroll-area.styles.ts";

function ScrollArea(props: ScrollAreaProps) {
  function classes() {
    return cn(
      scrollAreaVariants({
        orientation: props.orientation,
      }),
      props.focusable
        ? "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        : "",
      props.className
    );
  }

  function maxHeightValue() {
    if (props.maxHeight === undefined || props.maxHeight === null)
      return undefined;
    return typeof props.maxHeight === "number"
      ? props.maxHeight + "px"
      : props.maxHeight;
  }

  return (
    <div
      style={{
        maxHeight: maxHeightValue(),
      }}
      tabIndex={props.focusable ? 0 : undefined}
      role={props.focusable ? "region" : undefined}
      aria-label={props["aria-label"]}
      data-orientation={props.orientation || "vertical"}
      className={classes()}
    >
      {props.children}
    </div>
  );
}

export default ScrollArea;
