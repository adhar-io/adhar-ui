import * as React from "react";

export interface CommandShortcutProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { commandShortcutVariants } from "./command.styles.ts";

function CommandShortcut(props: CommandShortcutProps) {
  function classes() {
    return cn(commandShortcutVariants(), props.className);
  }

  return (
    <span aria-label={props["aria-label"]} className={classes()}>
      {props.children}
    </span>
  );
}

export default CommandShortcut;
