// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface PaginationLinkProps {
  href?: string;
  /** Marks this link as the current page (sets aria-current="page") */
  isActive?: boolean;
  /** Removes the link from navigation and the tab order */
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  className?: string;
  "aria-label"?: string;
  /** Use for client-side paging; not called while disabled */
  onClick?: (event: any) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { paginationLinkVariants } from "./pagination.styles.ts";

function PaginationLink(props: PaginationLinkProps) {
  const classes = createMemo(() => {
    return cn(
      paginationLinkVariants({
        isActive: !!props.isActive,
        size: props.size,
      }),
      props.className
    );
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
      aria-current={props.isActive ? "page" : undefined}
      aria-disabled={props.disabled ? true : undefined}
      aria-label={props["aria-label"]}
      onClick={(event) => handleClick(event)}
      onKeyDown={(event) => {
        if (!props.href && event.key === "Enter") handleClick(event);
      }}
    >
      {props.children}
    </a>
  );
}

export default PaginationLink;
