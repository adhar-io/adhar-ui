// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface PaginationEllipsisProps {
  className?: string;
  /** Screen-reader label (default "More pages") */
  label?: string;
}

import { cn } from "@adhar-ui/utils";
import { paginationEllipsisVariants } from "./pagination.styles.ts";

function PaginationEllipsis(props: PaginationEllipsisProps) {
  const classes = createMemo(() => {
    return cn(paginationEllipsisVariants(), props.className);
  });

  return (
    <span class={classes()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="19" cy="12" r="1"></circle>
        <circle cx="5" cy="12" r="1"></circle>
      </svg>
      <span class="sr-only">{props.label || "More pages"}</span>
    </span>
  );
}

export default PaginationEllipsis;
