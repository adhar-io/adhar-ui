// @ts-nocheck
import * as React from "react";

export interface ScrollAreaProps {
  orientation?: "vertical" | "horizontal" | "both";
  className?: string;
  /** Adds tabindex so keyboard users can scroll the region */
  focusable?: boolean;
  "aria-label"?: string;
  children?: any;
}

function ScrollArea(props: ScrollAreaProps) {
  return (
    <div
      tabIndex={props.focusable ? 0 : undefined}
      role={props.focusable ? "region" : undefined}
      aria-label={props["aria-label"]}
      data-orientation={props.orientation || "vertical"}
      className={props.className}
    >
      {props.children}
    </div>
  );
}

export default ScrollArea;
