// @ts-nocheck
import * as React from "react";

export interface HoverCardProps {
  className?: string;
  children?: any;
}

function HoverCard(props: HoverCardProps) {
  return <div className={props.className}>{props.children}</div>;
}

export default HoverCard;
