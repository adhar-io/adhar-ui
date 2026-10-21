// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface SheetFooterProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { sheetFooterVariants } from "./sheet.styles.ts";

function SheetFooter(props: SheetFooterProps) {
  const classes = createMemo(() => {
    return cn(sheetFooterVariants(), props.className);
  });

  return (
    <div class={classes()} id={props.id}>
      {props.children}
    </div>
  );
}

export default SheetFooter;
