// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface DropdownMenuShortcutProps {
  className?: string;
  id?: string;
  children?: any;
}

// Keyboard shortcut hint shown at the end of a DropdownMenuItem.

import { cn } from "@adhar-ui/utils";
import { dropdownMenuShortcutVariants } from "./dropdown-menu.styles.ts";

function DropdownMenuShortcut(props: DropdownMenuShortcutProps) {
  const classes = createMemo(() => {
    return cn(dropdownMenuShortcutVariants(), props.className);
  });

  return (
    <span class={classes()} aria-hidden="true" id={props.id}>
      {props.children}
    </span>
  );
}

export default DropdownMenuShortcut;
