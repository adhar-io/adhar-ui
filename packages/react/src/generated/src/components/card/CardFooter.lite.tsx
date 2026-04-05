// @ts-nocheck
import * as React from 'react';

export interface CardFooterProps {
  className?: string;
  children?: any;
}

function CardFooter(props: CardFooterProps) {
  return <div className={props.className}>{props.children}</div>;
}

export default CardFooter;
