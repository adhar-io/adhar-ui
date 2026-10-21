import * as React from "react";

export interface BreadcrumbPageProps {
  className?: string;
  children?: any;
}

// The current page — not a link. aria-current="page" marks it for AT.

import { cn } from "@adhar-ui/utils";
import { breadcrumbPageVariants } from "./breadcrumb.styles.ts";

function BreadcrumbPage(props: BreadcrumbPageProps) {
  function classes() {
    return cn(breadcrumbPageVariants(), props.className);
  }

  return (
    <span aria-current="page" className={classes()}>
      {props.children}
    </span>
  );
}

export default BreadcrumbPage;
