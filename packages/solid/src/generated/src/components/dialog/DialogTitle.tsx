// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface DialogTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Dialog as `aria-labelledby` so it is announced on open.

import { cn } from "@adhar-ui/utils";
import { dialogTitleVariants } from "./dialog.styles.ts";

function DialogTitle(props: DialogTitleProps) {
  const classes = createMemo(() => {
    return cn(dialogTitleVariants(), props.className);
  });

  return (
    <h2 class={classes()} id={props.id}>
      {props.children}
    </h2>
  );
}

export default DialogTitle;
