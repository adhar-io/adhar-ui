import * as React from "react";

export interface DropdownMenuShortcutProps {
  className?: string;
  id?: string;
  children?: any;
}

// Keyboard shortcut hint shown at the end of a DropdownMenuItem.

import { cn } from "@adhar-ui/utils";
import { dropdownMenuShortcutVariants } from "./dropdown-menu.styles.ts";

function DropdownMenuShortcut(props: DropdownMenuShortcutProps) {
  function classes() {
    return cn(dropdownMenuShortcutVariants(), props.className);
  }

  return (
    <span aria-hidden="true" id={props.id} className={classes()}>
      {props.children}
    </span>
  );
}

export default DropdownMenuShortcut;
