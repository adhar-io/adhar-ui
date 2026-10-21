import * as React from "react";

export interface SheetHeaderProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { sheetHeaderVariants } from "./sheet.styles.ts";

function SheetHeader(props: SheetHeaderProps) {
  function classes() {
    return cn(sheetHeaderVariants(), props.className);
  }

  return (
    <div id={props.id} className={classes()}>
      {props.children}
    </div>
  );
}

export default SheetHeader;
