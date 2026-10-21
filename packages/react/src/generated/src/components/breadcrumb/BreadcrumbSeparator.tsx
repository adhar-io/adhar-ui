import * as React from "react";

export interface BreadcrumbSeparatorProps {
  className?: string;
  /** Custom separator content; defaults to a chevron */
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { breadcrumbSeparatorVariants } from "./breadcrumb.styles.ts";

function BreadcrumbSeparator(props: BreadcrumbSeparatorProps) {
  function classes() {
    return cn(breadcrumbSeparatorVariants(), props.className);
  }

  return (
    <li role="presentation" aria-hidden="true" className={classes()}>
      {props.children ? (
        <>{props.children}</>
      ) : (
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
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </li>
  );
}

export default BreadcrumbSeparator;
