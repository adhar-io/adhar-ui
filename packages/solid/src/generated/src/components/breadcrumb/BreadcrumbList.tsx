// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface BreadcrumbListProps {
  className?: string;
  id?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { breadcrumbListVariants } from "./breadcrumb.styles.ts";

function BreadcrumbList(props: BreadcrumbListProps) {
  const classes = createMemo(() => {
    return cn(breadcrumbListVariants(), props.className);
  });

  return (
    <ol class={classes()} id={props.id}>
      {props.children}
    </ol>
  );
}

export default BreadcrumbList;
