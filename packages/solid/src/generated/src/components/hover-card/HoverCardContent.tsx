// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface HoverCardContentProps {
  side?: "top" | "bottom" | "left" | "right";
  id?: string;
  className?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { hoverCardContentVariants } from "./hover-card.styles.ts";

function HoverCardContent(props: HoverCardContentProps) {
  const classes = createMemo(() => {
    return cn(
      hoverCardContentVariants({
        side: props.side,
      }),
      props.className
    );
  });

  return (
    <div
      class={classes()}
      role="tooltip"
      id={props.id}
      data-side={props.side || "bottom"}
    >
      {props.children}
    </div>
  );
}

export default HoverCardContent;
