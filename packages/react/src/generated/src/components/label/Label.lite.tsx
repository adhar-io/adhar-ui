// @ts-nocheck
import * as React from "react";

export interface LabelProps {
  /** ID of the form control this label is bound to (compiles to `for` per framework) */
  htmlFor?: string;
  className?: string;
  children?: any;
}

function Label(props: LabelProps) {
  return (
    <label htmlFor={props.htmlFor} className={props.className}>
      {props.children}
    </label>
  );
}

export default Label;
