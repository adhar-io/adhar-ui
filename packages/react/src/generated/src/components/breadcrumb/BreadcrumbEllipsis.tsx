import * as React from "react";

export interface BreadcrumbEllipsisProps {
  className?: string;
  /** Screen-reader label for the collapsed items (default "More") */
  label?: string;
}

// Represents collapsed breadcrumb items (e.g. behind a "…" or a menu).

import { cn } from "@adhar-ui/utils";
import { breadcrumbEllipsisVariants } from "./breadcrumb.styles.ts";

function BreadcrumbEllipsis(props: BreadcrumbEllipsisProps) {
  function classes() {
    return cn(breadcrumbEllipsisVariants(), props.className);
  }

  return (
    <span className={classes()}>
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
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
      <span className="sr-only">{props.label || "More"}</span>
    </span>
  );
}

export default BreadcrumbEllipsis;
