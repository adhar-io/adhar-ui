// @ts-nocheck
export interface StepperProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  "aria-label"?: string;
  children?: any;
}

function Stepper(props: StepperProps) {
  return (
    <ol
      class={props.className}
      aria-label={props["aria-label"] || "Progress"}
      data-orientation={props.orientation || "horizontal"}
    >
      {props.children}
    </ol>
  );
}

export default Stepper;
