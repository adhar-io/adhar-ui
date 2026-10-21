import * as React from "react";

export interface DialogHeaderProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { dialogHeaderVariants } from "./dialog.styles.ts";

function DialogHeader(props: DialogHeaderProps) {
  function classes() {
    return cn(dialogHeaderVariants(), props.className);
  }

  return (
    <div id={props.id} className={classes()}>
      {props.children}
    </div>
  );
}

export default DialogHeader;
