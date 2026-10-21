// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface DialogFooterProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { dialogFooterVariants } from "./dialog.styles.ts";

function DialogFooter(props: DialogFooterProps) {
  const classes = createMemo(() => {
    return cn(dialogFooterVariants(), props.className);
  });

  return (
    <div class={classes()} id={props.id}>
      {props.children}
    </div>
  );
}

export default DialogFooter;
