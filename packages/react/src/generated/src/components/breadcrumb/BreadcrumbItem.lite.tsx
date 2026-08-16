// @ts-nocheck
import * as React from "react";

export interface BreadcrumbItemProps {
  className?: string;
  children?: any;
}

function BreadcrumbItem(props: BreadcrumbItemProps) {
  return <li className={props.className}>{props.children}</li>;
}

export default BreadcrumbItem;
