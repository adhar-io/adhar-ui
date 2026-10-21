import * as React from "react";

export interface DropdownMenuLabelProps {
  className?: string;
  id?: string;
  children?: any;
}

// Non-interactive heading for a group of menu items.

import { cn } from "@adhar-ui/utils";
import { dropdownMenuLabelVariants } from "./dropdown-menu.styles.ts";

function DropdownMenuLabel(props: DropdownMenuLabelProps) {
  function classes() {
    return cn(dropdownMenuLabelVariants(), props.className);
  }

  return (
    <div role="presentation" id={props.id} className={classes()}>
      {props.children}
    </div>
  );
}

export default DropdownMenuLabel;
