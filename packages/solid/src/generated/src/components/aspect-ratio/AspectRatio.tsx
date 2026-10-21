// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface AspectRatioProps {
  /** Width / height. A number (16 / 9) or a CSS value ("16 / 9"). Default 16 / 9. */
  ratio?: number | string;
  className?: string;
  children?: any;
}

// Constrains its child to a fixed aspect ratio using the native CSS property.

import { cn } from "@adhar-ui/utils";
import { aspectRatioVariants } from "./aspect-ratio.styles.ts";

function AspectRatio(props: AspectRatioProps) {
  const classes = createMemo(() => {
    return cn(aspectRatioVariants(), props.className);
  });

  const ratioValue = createMemo(() => {
    return props.ratio === undefined || props.ratio === null
      ? "16 / 9"
      : String(props.ratio);
  });

  return (
    <div
      class={classes()}
      style={{
        "aspect-ratio": ratioValue(),
      }}
    >
      {props.children}
    </div>
  );
}

export default AspectRatio;
