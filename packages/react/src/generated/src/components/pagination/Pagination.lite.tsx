// @ts-nocheck
import * as React from "react";

export interface PaginationProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

function Pagination(props: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label={props["aria-label"] || "Pagination"}
      className={props.className}
    >
      {props.children}
    </nav>
  );
}

export default Pagination;
