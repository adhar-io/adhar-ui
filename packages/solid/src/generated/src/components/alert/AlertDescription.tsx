// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface AlertDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { alertDescriptionVariants } from "./alert.styles.ts";

function AlertDescription(props: AlertDescriptionProps) {
  const classes = createMemo(() => {
    return cn(alertDescriptionVariants(), props.className);
  });

  return (
    <div class={classes()} id={props.id}>
      {props.children}
    </div>
  );
}

export default AlertDescription;
