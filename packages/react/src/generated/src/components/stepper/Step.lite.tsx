// @ts-nocheck
"use client";
import * as React from "react";

export interface StepProps {
  state?: "complete" | "current" | "upcoming" | "error";
  /** Number shown in the indicator when not complete */
  stepNumber?: number;
  label?: string;
  description?: string;
  /** Hide the trailing connector on the last step */
  last?: boolean;
  clickable?: boolean;
  className?: string;
  indicatorClass?: string;
  connectorClass?: string;
  labelClass?: string;
  descriptionClass?: string;
  onSelect?: () => void;
  children?: any;
}

function Step(props: StepProps) {
  return (
    <li
      aria-current={props.state === "current" ? "step" : undefined}
      className={props.className}
    >
      <button
        type="button"
        disabled={!props.clickable}
        aria-label={props.label}
        onClick={(event) => props.onSelect?.()}
        className={props.indicatorClass}
      >
        {props.state === "complete" ? (
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
        {props.state !== "complete" ? <span>{props.stepNumber}</span> : null}
      </button>
      <div>
        {props.label ? (
          <span className={props.labelClass}>{props.label}</span>
        ) : null}
        {props.description ? (
          <span className={props.descriptionClass}>{props.description}</span>
        ) : null}
        {props.children}
      </div>
      {!props.last ? (
        <span aria-hidden="true" className={props.connectorClass} />
      ) : null}
    </li>
  );
}

export default Step;
