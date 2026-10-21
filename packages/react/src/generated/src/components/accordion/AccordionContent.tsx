import * as React from "react";

export interface AccordionContentProps {
  open?: boolean;
  className?: string;
  /** Class for the inner padding wrapper */
  innerClass?: string;
  /** Give the region an id and pass it to AccordionTrigger `aria-controls` */
  id?: string;
  /** ID of the AccordionTrigger that labels this region */
  "aria-labelledby"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { accordionContentVariants } from "./accordion.styles.ts";

function AccordionContent(props: AccordionContentProps) {
  function classes() {
    return cn(accordionContentVariants(), props.className);
  }

  function innerClasses() {
    return cn("pb-4 pt-0", props.innerClass);
  }

  return (
    <div
      role="region"
      id={props.id}
      aria-labelledby={props["aria-labelledby"]}
      data-state={props.open ? "open" : "closed"}
      hidden={!props.open}
      className={classes()}
    >
      <div className={innerClasses()}>{props.children}</div>
    </div>
  );
}

export default AccordionContent;
