// @ts-nocheck
import * as React from 'react';

export interface CardTitleProps {
  className?: string;
  children?: any;
}

function CardTitle(props: CardTitleProps) {
  return <h3 className={props.className}>{props.children}</h3>;
}

export default CardTitle;
