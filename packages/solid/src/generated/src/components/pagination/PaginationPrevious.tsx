// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface PaginationPreviousProps {
  href?: string;
  /** Removes the link from navigation and the tab order (e.g. on the first page) */
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  className?: string;
  /** Visible label (default "Previous") */
  label?: string;
  /** Show only the chevron; the label stays available to screen readers */
  iconOnly?: boolean;
  "aria-label"?: string;
  onClick?: (event: any) => void;
}

import { cn } from "@adhar-ui/utils";
import { paginationLinkVariants } from "./pagination.styles.ts";

function PaginationPrevious(props: PaginationPreviousProps) {
  const classes = createMemo(() => {
    return cn(
      paginationLinkVariants({
        isActive: false,
        size: props.size,
      }),
      props.iconOnly ? "" : "gap-1 pl-2.5",
      props.className
    );
  });

  const labelClasses = createMemo(() => {
    return props.iconOnly ? "sr-only" : "hidden sm:inline";
  });

  function handleClick(event: any) {
    if (props.disabled) {
      event.preventDefault();
      return;
    }
    props.onClick?.(event);
  }

  return (
    <a
      class={classes()}
      href={props.disabled ? undefined : props.href}
      role={props.href && !props.disabled ? undefined : "link"}
      tabIndex={props.disabled ? -1 : props.href ? undefined : 0}
      aria-label={props["aria-label"] || "Go to previous page"}
      aria-disabled={props.disabled ? true : undefined}
      onClick={(event) => handleClick(event)}
      onKeyDown={(event) => {
        if (!props.href && event.key === "Enter") handleClick(event);
      }}
    >
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
        <path d="m15 18-6-6 6-6"></path>
      </svg>
      <span class={labelClasses()}>{props.label || "Previous"}</span>
    </a>
  );
}

export default PaginationPrevious;
