// @ts-nocheck
import * as React from "react";

export interface StepperProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  "aria-label"?: string;
  children?: any;
}

function Stepper(props: StepperProps) {
  return (
    <ol
      aria-label={props["aria-label"] || "Progress"}
      data-orientation={props.orientation || "horizontal"}
      className={props.className}
    >
      {props.children}
    </ol>
  );
}

export default Stepper;
