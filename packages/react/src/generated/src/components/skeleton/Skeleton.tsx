import * as React from "react";

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
  function classes() {
    return cn(
      skeletonVariants({
        variant: props.variant,
      }),
      "motion-reduce:animate-none",
      props.className
    );
  }

  return <div aria-hidden="true" className={classes()} />;
}

export default Skeleton;
