// @ts-nocheck
import * as React from 'react';

export interface AlertDescriptionProps {
  className?: string;
  children?: any;
}

function AlertDescription(props: AlertDescriptionProps) {
  return <div className={props.className}>{props.children}</div>;
}

export default AlertDescription;
