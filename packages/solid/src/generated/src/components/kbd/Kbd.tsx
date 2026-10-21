// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface KbdProps {
  size?: "sm" | "default" | "lg";
  className?: string;
  /** Spoken label for the key when the glyph is not descriptive (e.g. "⌘" → "Command") */
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { kbdVariants } from "./kbd.styles.ts";

function Kbd(props: KbdProps) {
  const classes = createMemo(() => {
    return cn(
      kbdVariants({
        size: props.size,
      }),
      props.className
    );
  });

  return (
    <kbd class={classes()} aria-label={props["aria-label"]}>
      {props.children}
    </kbd>
  );
}

export default Kbd;
