// @ts-nocheck
import * as React from "react";

export interface CommandShortcutProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

function CommandShortcut(props: CommandShortcutProps) {
  return (
    <span aria-label={props["aria-label"]} className={props.className}>
      {props.children}
    </span>
  );
}

export default CommandShortcut;
