// @ts-nocheck
import * as React from "react";

export interface KbdProps {
  className?: string;
  /** Spoken label for the key when the glyph is not descriptive (e.g. "⌘" → "Command") */
  "aria-label"?: string;
  children?: any;
}

function Kbd(props: KbdProps) {
  return (
    <kbd aria-label={props["aria-label"]} className={props.className}>
      {props.children}
    </kbd>
  );
}

export default Kbd;
