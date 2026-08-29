// @ts-nocheck
import * as React from "react";

export interface HoverCardTriggerProps {
  className?: string;
  /** ID of the content this trigger describes (for AT association) */
  "aria-describedby"?: string;
  children?: any;
}

// Focusable so the card opens on keyboard focus (group-focus-within), not just hover.

function HoverCardTrigger(props: HoverCardTriggerProps) {
  return (
    <span
      tabIndex={0}
      aria-describedby={props["aria-describedby"]}
      className={props.className}
    >
      {props.children}
    </span>
  );
}

export default HoverCardTrigger;
