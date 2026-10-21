import * as React from "react";

export interface CommandGroupProps {
  heading?: string;
  className?: string;
  headingClass?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import {
  commandGroupHeadingVariants,
  commandGroupVariants,
} from "./command.styles.ts";

function CommandGroup(props: CommandGroupProps) {
  function classes() {
    return cn(commandGroupVariants(), props.className);
  }

  function headingClasses() {
    return cn(commandGroupHeadingVariants(), props.headingClass);
  }

  return (
    <div role="group" aria-label={props.heading} className={classes()}>
      {props.heading ? (
        <div aria-hidden="true" className={headingClasses()}>
          {props.heading}
        </div>
      ) : null}
      {props.children}
    </div>
  );
}

export default CommandGroup;
