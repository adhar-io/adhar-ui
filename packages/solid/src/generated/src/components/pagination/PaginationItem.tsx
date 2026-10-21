// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface PaginationItemProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { paginationItemVariants } from "./pagination.styles.ts";

function PaginationItem(props: PaginationItemProps) {
  const classes = createMemo(() => {
    return cn(paginationItemVariants(), props.className);
  });

  return (
    <li class={classes()} id={props.id}>
      {props.children}
    </li>
  );
}

export default PaginationItem;
