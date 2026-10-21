// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

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
  const classes = createMemo(() => {
    return cn(
      stepperVariants({
        orientation: props.orientation,
      }),
      props.className
    );
  });

  return (
    <ol
      class={classes()}
      aria-label={props["aria-label"] || "Progress"}
      data-orientation={props.orientation || "horizontal"}
    >
      {props.children}
    </ol>
  );
}

export default Stepper;
