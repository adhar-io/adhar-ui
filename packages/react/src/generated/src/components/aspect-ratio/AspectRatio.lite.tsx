// @ts-nocheck
import * as React from "react";

export interface AspectRatioProps {
  /** CSS aspect-ratio value, e.g. "16 / 9", "1 / 1", "4 / 3" (default "16 / 9") */
  ratio?: string;
  className?: string;
  children?: any;
}

// Constrains its child to a fixed aspect ratio using the native CSS property.

function AspectRatio(props: AspectRatioProps) {
  return (
    <div
      style={{
        aspectRatio: props.ratio || "16 / 9",
      }}
      className={props.className}
    >
      {props.children}
    </div>
  );
}

export default AspectRatio;
