// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface SheetHeaderProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { sheetHeaderVariants } from "./sheet.styles.ts";

function SheetHeader(props: SheetHeaderProps) {
  const classes = createMemo(() => {
    return cn(sheetHeaderVariants(), props.className);
  });

  return (
    <div class={classes()} id={props.id}>
      {props.children}
    </div>
  );
}

export default SheetHeader;
