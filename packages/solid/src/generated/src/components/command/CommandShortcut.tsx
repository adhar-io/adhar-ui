// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface CommandShortcutProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { commandShortcutVariants } from "./command.styles.ts";

function CommandShortcut(props: CommandShortcutProps) {
  const classes = createMemo(() => {
    return cn(commandShortcutVariants(), props.className);
  });

  return (
    <span class={classes()} aria-label={props["aria-label"]}>
      {props.children}
    </span>
  );
}

export default CommandShortcut;
