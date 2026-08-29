// @ts-nocheck
import * as React from "react";

export interface CommandGroupProps {
  heading?: string;
  className?: string;
  headingClass?: string;
  children?: any;
}

function CommandGroup(props: CommandGroupProps) {
  return (
    <div role="group" className={props.className}>
      {props.heading ? (
        <div aria-hidden="true" className={props.headingClass}>
          {props.heading}
        </div>
      ) : null}
      {props.children}
    </div>
  );
}

export default CommandGroup;
