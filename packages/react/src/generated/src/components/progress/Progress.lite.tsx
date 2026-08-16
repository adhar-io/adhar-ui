// @ts-nocheck
import * as React from "react";

export interface ProgressProps {
  value?: number;
  max?: number;
  className?: string;
  indicatorClass?: string;
  "aria-label"?: string;
}

function Progress(props: ProgressProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={props.value || 0}
      aria-valuemin={0}
      aria-valuemax={props.max || 100}
      aria-label={props["aria-label"] || "Progress"}
      className={props.className}
    >
      <div
        style={{
          transform: `translateX(-${100 - (props.value || 0)}%)`,
        }}
        className={props.indicatorClass}
      />
    </div>
  );
}

export default Progress;
