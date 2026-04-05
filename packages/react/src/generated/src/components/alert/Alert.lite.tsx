// @ts-nocheck
import * as React from 'react';

export interface AlertProps {
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  className?: string;
  children?: any;
}

function Alert(props: AlertProps) {
  return (
    <div role='alert' className={props.className}>
      {props.children}
    </div>
  );
}

export default Alert;
