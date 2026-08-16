// @ts-nocheck
import * as React from "react";

export interface CardProps {
  className?: string;
  children?: any;
}

function Card(props: CardProps) {
  return <div className={props.className}>{props.children}</div>;
}

export default Card;
