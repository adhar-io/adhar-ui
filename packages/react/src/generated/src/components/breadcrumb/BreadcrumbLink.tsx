"use client";
import * as React from "react";

export interface BreadcrumbLinkProps {
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  /** Use for client-side routing; call event.preventDefault() to stop the native navigation */
  onClick?: (event: any) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { breadcrumbLinkVariants } from "./breadcrumb.styles.ts";

function BreadcrumbLink(props: BreadcrumbLinkProps) {
  function classes() {
    return cn(breadcrumbLinkVariants(), props.className);
  }

  return (
    <a
      href={props.href}
      target={props.target}
      rel={props.rel}
      onClick={(event) => props.onClick?.(event)}
      className={classes()}
    >
      {props.children}
    </a>
  );
}

export default BreadcrumbLink;
