import * as React from "react";

export interface CollapsibleProps {
  open?: boolean;
  disabled?: boolean;
  className?: string;
  children?: any;
}

function Collapsible(props: CollapsibleProps) {
  return (
    <div
      data-state={props.open ? "open" : "closed"}
      data-disabled={props.disabled ? "" : undefined}
      className={props.className}
    >
      {props.children}
    </div>
  );
}

export default Collapsible;
