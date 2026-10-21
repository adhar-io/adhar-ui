import * as React from "react";

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
  function classes() {
    return cn(
      kbdVariants({
        size: props.size,
      }),
      props.className
    );
  }

  return (
    <kbd aria-label={props["aria-label"]} className={classes()}>
      {props.children}
    </kbd>
  );
}

export default Kbd;
