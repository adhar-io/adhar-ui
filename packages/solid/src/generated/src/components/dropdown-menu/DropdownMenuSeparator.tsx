// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface DropdownMenuSeparatorProps {
  className?: string;
}

import { cn } from "@adhar-ui/utils";
import { dropdownMenuSeparatorVariants } from "./dropdown-menu.styles.ts";

function DropdownMenuSeparator(props: DropdownMenuSeparatorProps) {
  const classes = createMemo(() => {
    return cn(dropdownMenuSeparatorVariants(), props.className);
  });

  return <div class={classes()} role="separator"></div>;
}

export default DropdownMenuSeparator;
