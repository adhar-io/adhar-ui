import * as React from "react";

export interface AlertDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { alertDescriptionVariants } from "./alert.styles.ts";

function AlertDescription(props: AlertDescriptionProps) {
  function classes() {
    return cn(alertDescriptionVariants(), props.className);
  }

  return (
    <div id={props.id} className={classes()}>
      {props.children}
    </div>
  );
}

export default AlertDescription;
