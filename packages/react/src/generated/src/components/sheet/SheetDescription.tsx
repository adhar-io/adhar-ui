import * as React from "react";

export interface SheetDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Sheet as `aria-describedby`.

import { cn } from "@adhar-ui/utils";
import { sheetDescriptionVariants } from "./sheet.styles.ts";

function SheetDescription(props: SheetDescriptionProps) {
  function classes() {
    return cn(sheetDescriptionVariants(), props.className);
  }

  return (
    <p id={props.id} className={classes()}>
      {props.children}
    </p>
  );
}

export default SheetDescription;
