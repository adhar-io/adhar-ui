import * as React from "react";

export interface CommandSeparatorProps {
  className?: string;
}

import { cn } from "@adhar-ui/utils";
import { commandSeparatorVariants } from "./command.styles.ts";

function CommandSeparator(props: CommandSeparatorProps) {
  function classes() {
    return cn(commandSeparatorVariants(), props.className);
  }

  return (
    <div role="separator" aria-orientation="horizontal" className={classes()} />
  );
}

export default CommandSeparator;
