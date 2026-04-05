// @ts-nocheck
import * as React from 'react';

export interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  children?: any;
}

function Badge(props: BadgeProps) {
  return (
    <div role='status' className={props.className}>
      {props.children}
    </div>
  );
}

export default Badge;
