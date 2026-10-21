import * as React from "react";

export interface CommandListProps {
  id?: string;
  className?: string;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { commandListVariants } from "./command.styles.ts";

function CommandList(props: CommandListProps) {
  function classes() {
    return cn(commandListVariants(), props.className);
  }

  return (
    <div
      role="listbox"
      id={props.id}
      aria-label={props["aria-label"] || "Suggestions"}
      className={classes()}
    >
      {props.children}
    </div>
  );
}

export default CommandList;
