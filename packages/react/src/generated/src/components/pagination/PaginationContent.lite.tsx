// @ts-nocheck
import * as React from "react";

export interface PaginationContentProps {
  className?: string;
  children?: any;
}

function PaginationContent(props: PaginationContentProps) {
  return <ul className={props.className}>{props.children}</ul>;
}

export default PaginationContent;
