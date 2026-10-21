import * as React from "react";

export interface TimelineProps {
  className?: string;
  id?: string;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { timelineVariants } from "./timeline.styles.ts";

function Timeline(props: TimelineProps) {
  function classes() {
    return cn(timelineVariants(), props.className);
  }

  return (
    <ol
      id={props.id}
      aria-label={props["aria-label"] || "Timeline"}
      className={classes()}
    >
      {props.children}
    </ol>
  );
}

export default Timeline;
