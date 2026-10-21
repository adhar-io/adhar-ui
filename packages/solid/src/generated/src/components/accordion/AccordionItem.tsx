// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

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
  const classes = createMemo(() => {
    return cn(accordionItemVariants(), props.className);
  });

  return (
    <div
      class={classes()}
      data-value={props.value}
      data-state={props.open ? "open" : "closed"}
      data-disabled={props.disabled ? "" : undefined}
    >
      {props.children}
    </div>
  );
}

export default AccordionItem;
