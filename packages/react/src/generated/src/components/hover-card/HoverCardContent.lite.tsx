// @ts-nocheck
import * as React from "react";

export interface HoverCardContentProps {
  id?: string;
  className?: string;
  children?: any;
}

function HoverCardContent(props: HoverCardContentProps) {
  return (
    <div role="tooltip" id={props.id} className={props.className}>
      {props.children}
    </div>
  );
}

export default HoverCardContent;
