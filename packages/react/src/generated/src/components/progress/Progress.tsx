import * as React from "react";

export interface ProgressProps {
  /** Current value. Omit (or pass null) for an indeterminate, busy bar. */
  value?: number | null;
  max?: number;
  size?: "sm" | "default" | "lg";
  className?: string;
  indicatorClass?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /** Human-readable value, e.g. "3 of 10 files" (defaults to the percentage) */
  "aria-valuetext"?: string;
}

import { cn } from "@adhar-ui/utils";
import {
  progressIndicatorVariants,
  progressVariants,
} from "./progress.styles.ts";
import { clamp } from "../_internal/dom.ts";

function Progress(props: ProgressProps) {
  function isIndeterminate() {
    return props.value === undefined || props.value === null;
  }

  function maxValue() {
    return props.max && props.max > 0 ? props.max : 100;
  }

  function percent() {
    if (isIndeterminate()) return 0;
    return clamp(((props.value as number) / maxValue()) * 100, 0, 100);
  }

  function classes() {
    return cn(
      progressVariants({
        size: props.size,
      }),
      props.className
    );
  }

  function indicatorClasses() {
    return cn(
      progressIndicatorVariants(),
      isIndeterminate() ? "animate-pulse motion-reduce:animate-none" : "",
      props.indicatorClass
    );
  }

  function indicatorTransform() {
    return isIndeterminate()
      ? "translateX(0)"
      : "translateX(-" + (100 - percent()) + "%)";
  }

  function percentText() {
    return isIndeterminate() ? undefined : Math.round(percent()) + "%";
  }

  return (
    <div
      role="progressbar"
      aria-valuenow={isIndeterminate() ? undefined : (props.value as number)}
      aria-valuemin={0}
      aria-valuemax={maxValue()}
      aria-valuetext={props["aria-valuetext"] || percentText()}
      aria-busy={isIndeterminate() ? true : undefined}
      aria-label={
        props["aria-labelledby"] ? undefined : props["aria-label"] || "Progress"
      }
      aria-labelledby={props["aria-labelledby"]}
      data-state={
        isIndeterminate()
          ? "indeterminate"
          : percent() >= 100
          ? "complete"
          : "loading"
      }
      className={classes()}
    >
      <div
        style={{
          transform: indicatorTransform(),
        }}
        className={indicatorClasses()}
      />
    </div>
  );
}

export default Progress;
