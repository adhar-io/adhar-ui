import * as React from "react";

export interface DialogFooterProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { dialogFooterVariants } from "./dialog.styles.ts";

function DialogFooter(props: DialogFooterProps) {
  function classes() {
    return cn(dialogFooterVariants(), props.className);
  }

  return (
    <div id={props.id} className={classes()}>
      {props.children}
    </div>
  );
}

export default DialogFooter;
