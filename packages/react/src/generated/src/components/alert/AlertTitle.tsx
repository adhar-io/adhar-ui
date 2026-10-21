import * as React from "react";

export interface AlertTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { alertTitleVariants } from "./alert.styles.ts";

function AlertTitle(props: AlertTitleProps) {
  function classes() {
    return cn(alertTitleVariants(), props.className);
  }

  return (
    <h5 id={props.id} className={classes()}>
      {props.children}
    </h5>
  );
}

export default AlertTitle;
