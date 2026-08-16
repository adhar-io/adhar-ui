// @ts-nocheck
import * as React from "react";

export interface DialogFooterProps {
  className?: string;
  children?: any;
}

function DialogFooter(props: DialogFooterProps) {
  return <div className={props.className}>{props.children}</div>;
}

export default DialogFooter;
