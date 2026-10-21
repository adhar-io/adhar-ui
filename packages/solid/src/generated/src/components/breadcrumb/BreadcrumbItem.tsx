// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface BreadcrumbItemProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { breadcrumbItemVariants } from "./breadcrumb.styles.ts";

function BreadcrumbItem(props: BreadcrumbItemProps) {
  const classes = createMemo(() => {
    return cn(breadcrumbItemVariants(), props.className);
  });

  return (
    <li class={classes()} id={props.id}>
      {props.children}
    </li>
  );
}

export default BreadcrumbItem;
