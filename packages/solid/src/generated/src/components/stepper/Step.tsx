// @ts-nocheck
import { Show, createSignal, createMemo } from "solid-js";

export interface StepProps {
  state?: "complete" | "current" | "upcoming" | "error";
  /** Number shown in the indicator when not complete */
  stepNumber?: number;
  label?: string;
  description?: string;
  /** Match the parent Stepper’s orientation */
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "default" | "lg";
  /** Hide the trailing connector on the last step */
  last?: boolean;
  /** Lets users jump to this step via the indicator */
  clickable?: boolean;
  className?: string;
  indicatorClass?: string;
  connectorClass?: string;
  labelClass?: string;
  descriptionClass?: string;
  onSelect?: () => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import {
  stepConnectorClass,
  stepDescriptionVariants,
  stepIndicatorClass,
  stepLabelClass,
  stepVariants,
} from "./stepper.styles.ts";

function Step(props: StepProps) {
  const stepState = createMemo(() => {
    return props.state || "upcoming";
  });

  const classes = createMemo(() => {
    return cn(
      stepVariants({
        orientation: props.orientation,
      }),
      props.className
    );
  });

  const indicatorClasses = createMemo(() => {
    return cn(
      stepIndicatorClass(stepState(), props.size),
      props.clickable
        ? "cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        : "cursor-default",
      props.indicatorClass
    );
  });

  const connectorClasses = createMemo(() => {
    return cn(
      stepConnectorClass(stepState(), props.orientation),
      props.connectorClass
    );
  });

  const labelClasses = createMemo(() => {
    return cn(stepLabelClass(stepState()), "block", props.labelClass);
  });

  const descriptionClasses = createMemo(() => {
    return cn(stepDescriptionVariants(), "block", props.descriptionClass);
  });

  const statusText = createMemo(() => {
    if (stepState() === "complete") return "Completed";
    if (stepState() === "current") return "Current step";
    if (stepState() === "error") return "Error";
    return "Not started";
  });

  return (
    <li
      class={classes()}
      aria-current={stepState() === "current" ? "step" : undefined}
      data-state={stepState()}
    >
      <button
        class={indicatorClasses()}
        type="button"
        disabled={!props.clickable}
        aria-label={
          props.label ? props.label + ", " + statusText() : statusText()
        }
        onClick={(event) => props.onSelect?.()}
      >
        <Show when={stepState() === "complete"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        </Show>
        <Show when={stepState() === "error"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </Show>
        <Show when={stepState() === "current" || stepState() === "upcoming"}>
          <span aria-hidden="true">{props.stepNumber}</span>
        </Show>
      </button>
      <div class="min-w-0">
        <Show when={props.label}>
          <span class={labelClasses()} aria-hidden="true">
            {props.label}
          </span>
        </Show>
        <Show when={props.description}>
          <span class={descriptionClasses()}>{props.description}</span>
        </Show>
        {props.children}
      </div>
      <Show when={!props.last}>
        <span class={connectorClasses()} aria-hidden="true"></span>
      </Show>
    </li>
  );
}

export default Step;
