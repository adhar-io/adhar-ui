import * as React from "react";

export interface SheetTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Sheet as `aria-labelledby` so it is announced on open.

import { cn } from "@adhar-ui/utils";
import { sheetTitleVariants } from "./sheet.styles.ts";

function SheetTitle(props: SheetTitleProps) {
  function classes() {
    return cn(sheetTitleVariants(), props.className);
  }

  return (
    <h2 id={props.id} className={classes()}>
      {props.children}
    </h2>
  );
}

export default SheetTitle;
