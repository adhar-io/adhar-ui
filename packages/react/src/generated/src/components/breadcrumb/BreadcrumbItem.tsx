import * as React from "react";

export interface BreadcrumbItemProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { breadcrumbItemVariants } from "./breadcrumb.styles.ts";

function BreadcrumbItem(props: BreadcrumbItemProps) {
  function classes() {
    return cn(breadcrumbItemVariants(), props.className);
  }

  return (
    <li id={props.id} className={classes()}>
      {props.children}
    </li>
  );
}

export default BreadcrumbItem;
