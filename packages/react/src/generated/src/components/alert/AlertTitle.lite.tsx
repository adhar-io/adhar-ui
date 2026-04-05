// @ts-nocheck
import * as React from 'react';

export interface AlertTitleProps {
  className?: string;
  children?: any;
}

function AlertTitle(props: AlertTitleProps) {
  return <h5 className={props.className}>{props.children}</h5>;
}

export default AlertTitle;
