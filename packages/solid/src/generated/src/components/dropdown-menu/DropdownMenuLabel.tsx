// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface DropdownMenuLabelProps {
  className?: string;
  id?: string;
  children?: any;
}

// Non-interactive heading for a group of menu items.

import { cn } from "@adhar-ui/utils";
import { dropdownMenuLabelVariants } from "./dropdown-menu.styles.ts";

function DropdownMenuLabel(props: DropdownMenuLabelProps) {
  const classes = createMemo(() => {
    return cn(dropdownMenuLabelVariants(), props.className);
  });

  return (
    <div class={classes()} role="presentation" id={props.id}>
      {props.children}
    </div>
  );
}

export default DropdownMenuLabel;
