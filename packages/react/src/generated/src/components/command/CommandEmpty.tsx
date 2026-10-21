import * as React from "react";

export interface CommandEmptyProps {
  className?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { commandEmptyVariants } from "./command.styles.ts";

function CommandEmpty(props: CommandEmptyProps) {
  function classes() {
    return cn(commandEmptyVariants(), props.className);
  }

  return (
    <div role="presentation" className={classes()}>
      {props.children}
    </div>
  );
}

export default CommandEmpty;
