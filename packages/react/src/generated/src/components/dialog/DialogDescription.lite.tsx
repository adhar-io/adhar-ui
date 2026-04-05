// @ts-nocheck
import * as React from 'react';

export interface DialogDescriptionProps {
  className?: string;
  children?: any;
}

function DialogDescription(props: DialogDescriptionProps) {
  return <p className={props.className}>{props.children}</p>;
}

export default DialogDescription;
