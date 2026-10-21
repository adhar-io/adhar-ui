import * as React from "react";

export interface StepperProps {
  /** Pass the same orientation to each Step */
  orientation?: "horizontal" | "vertical";
  className?: string;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { stepperVariants } from "./stepper.styles.ts";

function Stepper(props: StepperProps) {
  function classes() {
    return cn(
      stepperVariants({
        orientation: props.orientation,
      }),
      props.className
    );
  }

  return (
    <ol
      aria-label={props["aria-label"] || "Progress"}
      data-orientation={props.orientation || "horizontal"}
      className={classes()}
    >
      {props.children}
    </ol>
  );
}

export default Stepper;
