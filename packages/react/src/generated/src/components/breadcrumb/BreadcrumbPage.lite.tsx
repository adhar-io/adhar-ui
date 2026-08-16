// @ts-nocheck
import * as React from "react";

export interface BreadcrumbPageProps {
  className?: string;
  children?: any;
}

// The current page — not a link. aria-current="page" marks it for AT.

function BreadcrumbPage(props: BreadcrumbPageProps) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={props.className}
    >
      {props.children}
    </span>
  );
}

export default BreadcrumbPage;
