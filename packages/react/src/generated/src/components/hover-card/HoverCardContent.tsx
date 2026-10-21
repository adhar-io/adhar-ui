import * as React from "react";

export interface HoverCardContentProps {
  side?: "top" | "bottom" | "left" | "right";
  id?: string;
  className?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { hoverCardContentVariants } from "./hover-card.styles.ts";

function HoverCardContent(props: HoverCardContentProps) {
  function classes() {
    return cn(
      hoverCardContentVariants({
        side: props.side,
      }),
      props.className
    );
  }

  return (
    <div
      role="tooltip"
      id={props.id}
      data-side={props.side || "bottom"}
      className={classes()}
    >
      {props.children}
    </div>
  );
}

export default HoverCardContent;
