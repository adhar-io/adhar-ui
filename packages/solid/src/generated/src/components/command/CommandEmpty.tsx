// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface CommandEmptyProps {
  className?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { commandEmptyVariants } from "./command.styles.ts";

function CommandEmpty(props: CommandEmptyProps) {
  const classes = createMemo(() => {
    return cn(commandEmptyVariants(), props.className);
  });

  return (
    <div class={classes()} role="presentation">
      {props.children}
    </div>
  );
}

export default CommandEmpty;
