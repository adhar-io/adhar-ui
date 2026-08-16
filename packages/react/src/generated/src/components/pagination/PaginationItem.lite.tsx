// @ts-nocheck
import * as React from "react";

export interface PaginationItemProps {
  className?: string;
  children?: any;
}

function PaginationItem(props: PaginationItemProps) {
  return <li className={props.className}>{props.children}</li>;
}

export default PaginationItem;
