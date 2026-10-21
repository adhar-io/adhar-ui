import * as React from "react";

export interface DropdownMenuSeparatorProps {
  className?: string;
}

import { cn } from "@adhar-ui/utils";
import { dropdownMenuSeparatorVariants } from "./dropdown-menu.styles.ts";

function DropdownMenuSeparator(props: DropdownMenuSeparatorProps) {
  function classes() {
    return cn(dropdownMenuSeparatorVariants(), props.className);
  }

  return <div role="separator" className={classes()} />;
}

export default DropdownMenuSeparator;
