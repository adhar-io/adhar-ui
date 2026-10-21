// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface TimelineProps {
  className?: string;
  id?: string;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { timelineVariants } from "./timeline.styles.ts";

function Timeline(props: TimelineProps) {
  const classes = createMemo(() => {
    return cn(timelineVariants(), props.className);
  });

  return (
    <ol
      class={classes()}
      id={props.id}
      aria-label={props["aria-label"] || "Timeline"}
    >
      {props.children}
    </ol>
  );
}

export default Timeline;
