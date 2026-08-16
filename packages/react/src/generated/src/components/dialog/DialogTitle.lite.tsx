// @ts-nocheck
import * as React from "react";

export interface DialogTitleProps {
  className?: string;
  children?: any;
}

function DialogTitle(props: DialogTitleProps) {
  return <h2 className={props.className}>{props.children}</h2>;
}

export default DialogTitle;
