// @ts-nocheck
import * as React from "react";

export interface BreadcrumbProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

function Breadcrumb(props: BreadcrumbProps) {
  return (
    <nav
      aria-label={props["aria-label"] || "Breadcrumb"}
      className={props.className}
    >
      {props.children}
    </nav>
  );
}

export default Breadcrumb;
