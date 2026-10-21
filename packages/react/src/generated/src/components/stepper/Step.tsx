"use client";
import * as React from "react";

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
  function stepState() {
    return props.state || "upcoming";
  }

  function classes() {
    return cn(
      stepVariants({
        orientation: props.orientation,
      }),
      props.className
    );
  }

  function indicatorClasses() {
    return cn(
      stepIndicatorClass(stepState(), props.size),
      props.clickable
        ? "cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        : "cursor-default",
      props.indicatorClass
    );
  }

  function connectorClasses() {
    return cn(
      stepConnectorClass(stepState(), props.orientation),
      props.connectorClass
    );
  }

  function labelClasses() {
    return cn(stepLabelClass(stepState()), "block", props.labelClass);
  }

  function descriptionClasses() {
    return cn(stepDescriptionVariants(), "block", props.descriptionClass);
  }

  function statusText() {
    if (stepState() === "complete") return "Completed";
    if (stepState() === "current") return "Current step";
    if (stepState() === "error") return "Error";
    return "Not started";
  }

  return (
    <li
      aria-current={stepState() === "current" ? "step" : undefined}
      data-state={stepState()}
      className={classes()}
    >
      <button
        type="button"
        disabled={!props.clickable}
        aria-label={
          props.label ? props.label + ", " + statusText() : statusText()
        }
        onClick={(event) => props.onSelect?.()}
        className={indicatorClasses()}
      >
        {stepState() === "complete" ? (
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
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : null}
        {stepState() === "error" ? (
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : null}
        {stepState() === "current" || stepState() === "upcoming" ? (
          <span aria-hidden="true">{props.stepNumber}</span>
        ) : null}
      </button>
      <div className="min-w-0">
        {props.label ? (
          <span aria-hidden="true" className={labelClasses()}>
            {props.label}
          </span>
        ) : null}
        {props.description ? (
          <span className={descriptionClasses()}>{props.description}</span>
        ) : null}
        {props.children}
      </div>
      {!props.last ? (
        <span aria-hidden="true" className={connectorClasses()} />
      ) : null}
    </li>
  );
}

export default Step;
