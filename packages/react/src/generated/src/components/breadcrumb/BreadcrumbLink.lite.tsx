// @ts-nocheck
"use client";
import * as React from "react";

export interface BreadcrumbLinkProps {
  href?: string;
  className?: string;
  onClick?: (event: any) => void;
  children?: any;
}

function BreadcrumbLink(props: BreadcrumbLinkProps) {
  return (
    <a
      href={props.href}
      onClick={(event) => props.onClick?.(event)}
      className={props.className}
    >
      {props.children}
    </a>
  );
}

export default BreadcrumbLink;
