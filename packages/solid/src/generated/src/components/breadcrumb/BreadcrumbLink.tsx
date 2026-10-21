// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

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
  const classes = createMemo(() => {
    return cn(breadcrumbLinkVariants(), props.className);
  });

  return (
    <a
      class={classes()}
      href={props.href}
      target={props.target}
      rel={props.rel}
      onClick={(event) => props.onClick?.(event)}
    >
      {props.children}
    </a>
  );
}

export default BreadcrumbLink;
