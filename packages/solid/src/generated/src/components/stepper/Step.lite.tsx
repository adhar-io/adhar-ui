// @ts-nocheck
import { Show } from "solid-js";

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
      class={props.className}
      aria-current={props.state === "current" ? "step" : undefined}
    >
      <button
        class={props.indicatorClass}
        type="button"
        disabled={!props.clickable}
        aria-label={props.label}
        onClick={(event) => props.onSelect?.()}
      >
        <Show when={props.state === "complete"}>
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
        <Show when={props.state !== "complete"}>
          <span>{props.stepNumber}</span>
        </Show>
      </button>
      <div>
        <Show when={props.label}>
          <span class={props.labelClass}>{props.label}</span>
        </Show>
        <Show when={props.description}>
          <span class={props.descriptionClass}>{props.description}</span>
        </Show>
        {props.children}
      </div>
      <Show when={!props.last}>
        <span class={props.connectorClass} aria-hidden="true"></span>
      </Show>
    </li>
  );
}

export default Step;
