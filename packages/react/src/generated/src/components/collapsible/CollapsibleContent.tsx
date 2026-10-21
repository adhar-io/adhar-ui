import * as React from "react";

export interface CollapsibleContentProps {
  open?: boolean;
  id?: string;
  className?: string;
  /** Class for the required inner overflow-hidden wrapper */
  innerClass?: string;
  /** ID of the trigger, to expose the content as a labelled region */
  "aria-labelledby"?: string;
  children?: any;
}

// Animates height with the grid-rows 0fr → 1fr technique; closed content is
// `invisible`, so it is skipped by Tab and screen readers but stays mounted.

import { cn } from "@adhar-ui/utils";
import {
  collapsibleContentInnerVariants,
  collapsibleContentVariants,
} from "./collapsible.styles.ts";

function CollapsibleContent(props: CollapsibleContentProps) {
  function classes() {
    return cn(
      collapsibleContentVariants({
        open: !!props.open,
      }),
      props.className
    );
  }

  function innerClasses() {
    return cn(collapsibleContentInnerVariants(), props.innerClass);
  }

  return (
    <div
      id={props.id}
      role={props["aria-labelledby"] ? "region" : undefined}
      aria-labelledby={props["aria-labelledby"]}
      data-state={props.open ? "open" : "closed"}
      className={classes()}
    >
      <div className={innerClasses()}>{props.children}</div>
    </div>
  );
}

export default CollapsibleContent;
