import * as React from "react";

export interface BreadcrumbListProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { breadcrumbListVariants } from "./breadcrumb.styles.ts";

function BreadcrumbList(props: BreadcrumbListProps) {
  function classes() {
    return cn(breadcrumbListVariants(), props.className);
  }

  return (
    <ol id={props.id} className={classes()}>
      {props.children}
    </ol>
  );
}

export default BreadcrumbList;
