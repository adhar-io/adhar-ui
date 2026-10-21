// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface CommandListProps {
  id?: string;
  className?: string;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { commandListVariants } from "./command.styles.ts";

function CommandList(props: CommandListProps) {
  const classes = createMemo(() => {
    return cn(commandListVariants(), props.className);
  });

  return (
    <div
      class={classes()}
      role="listbox"
      id={props.id}
      aria-label={props["aria-label"] || "Suggestions"}
    >
      {props.children}
    </div>
  );
}

export default CommandList;
