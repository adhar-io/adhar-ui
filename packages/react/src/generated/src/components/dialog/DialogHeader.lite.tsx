// @ts-nocheck
import * as React from 'react';

export interface DialogHeaderProps {
  className?: string;
  children?: any;
}

function DialogHeader(props: DialogHeaderProps) {
  return <div className={props.className}>{props.children}</div>;
}

export default DialogHeader;
