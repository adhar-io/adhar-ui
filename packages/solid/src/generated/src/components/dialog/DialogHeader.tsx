// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface DialogHeaderProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { dialogHeaderVariants } from "./dialog.styles.ts";

function DialogHeader(props: DialogHeaderProps) {
  const classes = createMemo(() => {
    return cn(dialogHeaderVariants(), props.className);
  });

  return (
    <div class={classes()} id={props.id}>
      {props.children}
    </div>
  );
}

export default DialogHeader;
