// @ts-nocheck
import { Show, createSignal, createMemo } from "solid-js";

export interface BreadcrumbSeparatorProps {
  className?: string;
  /** Custom separator content; defaults to a chevron */
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { breadcrumbSeparatorVariants } from "./breadcrumb.styles.ts";

function BreadcrumbSeparator(props: BreadcrumbSeparatorProps) {
  const classes = createMemo(() => {
    return cn(breadcrumbSeparatorVariants(), props.className);
  });

  return (
    <li class={classes()} role="presentation" aria-hidden="true">
      <Show
        fallback={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        }
        when={props.children}
      >
        {props.children}
      </Show>
    </li>
  );
}

export default BreadcrumbSeparator;
