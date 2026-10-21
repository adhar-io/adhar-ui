import * as React from "react";

export interface PaginationContentProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { paginationContentVariants } from "./pagination.styles.ts";

function PaginationContent(props: PaginationContentProps) {
  function classes() {
    return cn(paginationContentVariants(), props.className);
  }

  return (
    <ul id={props.id} className={classes()}>
      {props.children}
    </ul>
  );
}

export default PaginationContent;
