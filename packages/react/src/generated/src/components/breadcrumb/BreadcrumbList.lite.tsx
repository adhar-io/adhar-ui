// @ts-nocheck
import * as React from "react";

export interface BreadcrumbListProps {
  className?: string;
  children?: any;
}

function BreadcrumbList(props: BreadcrumbListProps) {
  return <ol className={props.className}>{props.children}</ol>;
}

export default BreadcrumbList;
