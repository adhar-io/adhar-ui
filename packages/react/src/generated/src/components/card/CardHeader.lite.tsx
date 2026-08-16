// @ts-nocheck
import * as React from "react";

export interface CardHeaderProps {
  className?: string;
  children?: any;
}

function CardHeader(props: CardHeaderProps) {
  return <div className={props.className}>{props.children}</div>;
}

export default CardHeader;
