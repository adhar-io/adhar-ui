import * as React from "react";

export interface PaginationItemProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { paginationItemVariants } from "./pagination.styles.ts";

function PaginationItem(props: PaginationItemProps) {
  function classes() {
    return cn(paginationItemVariants(), props.className);
  }

  return (
    <li id={props.id} className={classes()}>
      {props.children}
    </li>
  );
}

export default PaginationItem;
