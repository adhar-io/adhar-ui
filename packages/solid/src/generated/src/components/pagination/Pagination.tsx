// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface PaginationProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { paginationVariants } from "./pagination.styles.ts";

function Pagination(props: PaginationProps) {
  const classes = createMemo(() => {
    return cn(paginationVariants(), props.className);
  });

  return (
    <nav class={classes()} aria-label={props["aria-label"] || "Pagination"}>
      {props.children}
    </nav>
  );
}

export default Pagination;
