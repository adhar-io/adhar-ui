// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface SkeletonProps {
  /** Preset shape: text line, heading, avatar circle, button, card, or image */
  variant?:
    | "default"
    | "text"
    | "heading"
    | "avatar"
    | "button"
    | "card"
    | "image";
  className?: string;
}

import { cn } from "@adhar-ui/utils";
import { skeletonVariants } from "./skeleton.styles.ts";

function Skeleton(props: SkeletonProps) {
  const classes = createMemo(() => {
    return cn(
      skeletonVariants({
        variant: props.variant,
      }),
      "motion-reduce:animate-none",
      props.className
    );
  });

  return <div class={classes()} aria-hidden="true"></div>;
}

export default Skeleton;
