import * as React from "react";

export interface AccordionItemProps {
  value: string;
  /** Exposes data-state="open" for styling */
  open?: boolean;
  disabled?: boolean;
  className?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { accordionItemVariants } from "./accordion.styles.ts";

function AccordionItem(props: AccordionItemProps) {
  function classes() {
    return cn(accordionItemVariants(), props.className);
  }

  return (
    <div
      data-value={props.value}
      data-state={props.open ? "open" : "closed"}
      data-disabled={props.disabled ? "" : undefined}
      className={classes()}
    >
      {props.children}
    </div>
  );
}

export default AccordionItem;
