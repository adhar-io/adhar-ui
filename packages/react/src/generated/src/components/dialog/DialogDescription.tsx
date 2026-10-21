import * as React from "react";

export interface DialogDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Dialog as `aria-describedby`.

import { cn } from "@adhar-ui/utils";
import { dialogDescriptionVariants } from "./dialog.styles.ts";

function DialogDescription(props: DialogDescriptionProps) {
  function classes() {
    return cn(dialogDescriptionVariants(), props.className);
  }

  return (
    <p id={props.id} className={classes()}>
      {props.children}
    </p>
  );
}

export default DialogDescription;
