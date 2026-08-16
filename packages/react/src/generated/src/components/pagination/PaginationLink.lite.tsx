// @ts-nocheck
"use client";
import * as React from "react";

export interface PaginationLinkProps {
  href?: string;
  /** Marks this link as the current page (sets aria-current="page") */
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  onClick?: (event: any) => void;
  children?: any;
}

function PaginationLink(props: PaginationLinkProps) {
  return (
    <a
      href={props.href}
      aria-current={props.isActive ? "page" : undefined}
      aria-disabled={props.disabled ? true : false}
      aria-label={props["aria-label"]}
      onClick={(event) => props.onClick?.(event)}
      className={props.className}
    >
      {props.children}
    </a>
  );
}

export default PaginationLink;
