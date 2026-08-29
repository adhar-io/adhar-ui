// @ts-nocheck
import * as React from "react";

export interface TimelineProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

function Timeline(props: TimelineProps) {
  return (
    <ol
      aria-label={props["aria-label"] || "Timeline"}
      className={props.className}
    >
      {props.children}
    </ol>
  );
}

export default Timeline;
