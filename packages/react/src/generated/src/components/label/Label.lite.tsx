// @ts-nocheck
import * as React from 'react';

export interface LabelProps {
  for?: string;
  className?: string;
  children?: any;
}

function Label(props: LabelProps) {
  return (
    <label htmlFor={props.for} className={props.className}>
      {props.children}
    </label>
  );
}

export default Label;
