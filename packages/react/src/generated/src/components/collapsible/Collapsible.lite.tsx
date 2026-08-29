// @ts-nocheck
import * as React from "react";

export interface CollapsibleProps {
  open?: boolean;
  className?: string;
  children?: any;
}

function Collapsible(props: CollapsibleProps) {
  return (
    <div
      data-state={props.open ? "open" : "closed"}
      className={props.className}
    >
      {props.children}
    </div>
  );
}

export default Collapsible;
