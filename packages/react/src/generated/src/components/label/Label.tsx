import * as React from "react";

export interface LabelProps {
  /** ID of the form control this label is bound to (compiles to `for` per framework) */
  htmlFor?: string;
  id?: string;
  /** Appends a required marker (*). The control itself should also set `required`. */
  required?: boolean;
  /** Dims the label to match a disabled control that is not its `peer` sibling */
  disabled?: boolean;
  className?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { labelVariants } from "./label.styles.ts";

function Label(props: LabelProps) {
  function classes() {
    return cn(
      labelVariants({
        required: !!props.required,
      }),
      props.disabled ? "cursor-not-allowed opacity-70" : "",
      props.className
    );
  }

  return (
    <label
      id={props.id}
      htmlFor={props.htmlFor}
      data-disabled={props.disabled ? "" : undefined}
      className={classes()}
    >
      {props.children}
    </label>
  );
}

export default Label;
