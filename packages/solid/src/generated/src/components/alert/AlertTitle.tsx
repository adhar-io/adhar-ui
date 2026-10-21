// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface AlertTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { alertTitleVariants } from "./alert.styles.ts";

function AlertTitle(props: AlertTitleProps) {
  const classes = createMemo(() => {
    return cn(alertTitleVariants(), props.className);
  });

  return (
    <h5 class={classes()} id={props.id}>
      {props.children}
    </h5>
  );
}

export default AlertTitle;
