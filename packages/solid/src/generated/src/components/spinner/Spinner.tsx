// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface SpinnerProps {
  size?: "xs" | "sm" | "default" | "lg" | "xl";
  /** Text announced to screen readers (default "Loading") */
  label?: string;
  /** Alias of `label` */
  "aria-label"?: string;
  className?: string;
}

import { cn } from "@adhar-ui/utils";
import { spinnerVariants } from "./spinner.styles.ts";

function Spinner(props: SpinnerProps) {
  const classes = createMemo(() => {
    return cn(
      "inline-block shrink-0",
      spinnerVariants({
        size: props.size,
      }),
      props.className
    );
  });

  return (
    <span class={classes()} role="status">
      <svg
        class="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          opacity="0.25"
        ></circle>
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          opacity="0.75"
        ></path>
      </svg>
      <span class="sr-only">
        {props.label || props["aria-label"] || "Loading"}
      </span>
    </span>
  );
}

export default Spinner;
