// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface CommandSeparatorProps {
  className?: string;
}

import { cn } from "@adhar-ui/utils";
import { commandSeparatorVariants } from "./command.styles.ts";

function CommandSeparator(props: CommandSeparatorProps) {
  const classes = createMemo(() => {
    return cn(commandSeparatorVariants(), props.className);
  });

  return (
    <div class={classes()} role="separator" aria-orientation="horizontal"></div>
  );
}

export default CommandSeparator;
