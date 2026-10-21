// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface BreadcrumbPageProps {
  className?: string;
  children?: any;
}

// The current page — not a link. aria-current="page" marks it for AT.

import { cn } from "@adhar-ui/utils";
import { breadcrumbPageVariants } from "./breadcrumb.styles.ts";

function BreadcrumbPage(props: BreadcrumbPageProps) {
  const classes = createMemo(() => {
    return cn(breadcrumbPageVariants(), props.className);
  });

  return (
    <span class={classes()} aria-current="page">
      {props.children}
    </span>
  );
}

export default BreadcrumbPage;
