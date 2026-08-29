// @ts-nocheck
import * as React from "react";

export interface CommandEmptyProps {
  className?: string;
  children?: any;
}

function CommandEmpty(props: CommandEmptyProps) {
  return (
    <div role="presentation" className={props.className}>
      {props.children}
    </div>
  );
}

export default CommandEmpty;
