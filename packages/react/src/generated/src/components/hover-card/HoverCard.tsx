import * as React from "react";

export interface HoverCardProps {
  className?: string;
  children?: any;
}

// CSS-only: HoverCardContent is shown while the pointer is over, or keyboard
// focus is inside, this wrapper. Escape is not needed since moving away hides it.

import { cn } from "@adhar-ui/utils";
import { hoverCardVariants } from "./hover-card.styles.ts";

function HoverCard(props: HoverCardProps) {
  function classes() {
    return cn(hoverCardVariants(), props.className);
  }

  return <div className={classes()}>{props.children}</div>;
}

export default HoverCard;
