// @ts-nocheck
import * as React from "react";

export interface AccordionProps {
  type?: "single" | "multiple";
  className?: string;
  children?: any;
}

function Accordion(props: AccordionProps) {
  return (
    <div data-type={props.type || "single"} className={props.className}>
      {props.children}
    </div>
  );
}

export default Accordion;
