"use client";
import * as React from "react";

export interface AccordionTriggerProps {
  open?: boolean;
  /** The owning item’s value — lets Accordion’s onValueChange handle the click */
  value?: string;
  disabled?: boolean;
  className?: string;
  /** Class for the heading element wrapping the trigger */
  headingClass?: string;
  /** Give the trigger an id and pass it to AccordionContent `aria-labelledby` */
  id?: string;
  /** ID of the AccordionContent region this trigger toggles */
  "aria-controls"?: string;
  onClick?: () => void;
  children?: any;
}

// Wrapped in a heading per the WAI-ARIA accordion pattern, so screen-reader
// users can jump between sections with heading navigation.

import { cn } from "@adhar-ui/utils";
import { accordionTriggerVariants } from "./accordion.styles.ts";

function AccordionTrigger(props: AccordionTriggerProps) {
  function classes() {
    return cn(
      accordionTriggerVariants(),
      "w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm disabled:cursor-not-allowed disabled:opacity-50",
      props.className
    );
  }

  function headingClasses() {
    return cn("flex", props.headingClass);
  }

  return (
    <h3 className={headingClasses()}>
      <button
        type="button"
        data-accordion-trigger=""
        id={props.id}
        disabled={props.disabled}
        aria-expanded={props.open ? true : false}
        aria-controls={props["aria-controls"]}
        data-state={props.open ? "open" : "closed"}
        data-value={props.value}
        onClick={(event) => props.onClick?.()}
        className={classes()}
      >
        {props.children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </h3>
  );
}

export default AccordionTrigger;
