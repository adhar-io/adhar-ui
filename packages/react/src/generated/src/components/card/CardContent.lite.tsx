// @ts-nocheck
import * as React from "react";

export interface CardContentProps {
  className?: string;
  children?: any;
}

function CardContent(props: CardContentProps) {
  return <div className={props.className}>{props.children}</div>;
}

export default CardContent;
