import * as React from "react";

export interface PaginationProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { paginationVariants } from "./pagination.styles.ts";

function Pagination(props: PaginationProps) {
  function classes() {
    return cn(paginationVariants(), props.className);
  }

  return (
    <nav aria-label={props["aria-label"] || "Pagination"} className={classes()}>
      {props.children}
    </nav>
  );
}

export default Pagination;
