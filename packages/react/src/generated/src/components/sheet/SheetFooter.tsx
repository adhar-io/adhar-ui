import * as React from "react";

export interface SheetFooterProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { sheetFooterVariants } from "./sheet.styles.ts";

function SheetFooter(props: SheetFooterProps) {
  function classes() {
    return cn(sheetFooterVariants(), props.className);
  }

  return (
    <div id={props.id} className={classes()}>
      {props.children}
    </div>
  );
}

export default SheetFooter;
