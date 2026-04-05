// @ts-nocheck
import * as React from 'react';

export interface CardDescriptionProps {
  className?: string;
  children?: any;
}

function CardDescription(props: CardDescriptionProps) {
  return <p className={props.className}>{props.children}</p>;
}

export default CardDescription;
