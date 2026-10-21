// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface SheetDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Sheet as `aria-describedby`.

import { cn } from "@adhar-ui/utils";
import { sheetDescriptionVariants } from "./sheet.styles.ts";

function SheetDescription(props: SheetDescriptionProps) {
  const classes = createMemo(() => {
    return cn(sheetDescriptionVariants(), props.className);
  });

  return (
    <p class={classes()} id={props.id}>
      {props.children}
    </p>
  );
}

export default SheetDescription;
