// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface PaginationContentProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { paginationContentVariants } from "./pagination.styles.ts";

function PaginationContent(props: PaginationContentProps) {
  const classes = createMemo(() => {
    return cn(paginationContentVariants(), props.className);
  });

  return (
    <ul class={classes()} id={props.id}>
      {props.children}
    </ul>
  );
}

export default PaginationContent;
