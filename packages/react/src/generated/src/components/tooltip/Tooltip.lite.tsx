// @ts-nocheck
import { useLocalProxy } from "../../../../runtime.ts";
"use client";
import * as React from "react";

export interface TooltipProps {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  delay?: number;
  children?: any;
}

function Tooltip(props: TooltipProps) {
  const state = useLocalProxy({
    handleMouseEnter: null,
    handleMouseLeave: null,
    handleFocus: null,
    handleBlur: null,
    visible: null,
  });

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
      }}
      className={props.className}
    >
      <div
        onMouseEnter={(event) => state.handleMouseEnter()}
        onMouseLeave={(event) => state.handleMouseLeave()}
        onFocus={(event) => state.handleFocus()}
        onBlur={(event) => state.handleBlur()}
        aria-describedby={state.visible ? "tooltip-content" : undefined}
        className={props.triggerClass}
      >
        {props.children}
      </div>
      {state.visible ? (
        <div id="tooltip-content" role="tooltip" className={props.contentClass}>
          {props.content}
        </div>
      ) : null}
    </div>
  );
}

export default Tooltip;
