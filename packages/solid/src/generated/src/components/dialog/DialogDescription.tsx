// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface DialogDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Dialog as `aria-describedby`.

import { cn } from "@adhar-ui/utils";
import { dialogDescriptionVariants } from "./dialog.styles.ts";

function DialogDescription(props: DialogDescriptionProps) {
  const classes = createMemo(() => {
    return cn(dialogDescriptionVariants(), props.className);
  });

  return (
    <p class={classes()} id={props.id}>
      {props.children}
    </p>
  );
}

export default DialogDescription;
