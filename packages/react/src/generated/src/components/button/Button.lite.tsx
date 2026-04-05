// @ts-nocheck
'use client';
import * as React from 'react';

export interface ButtonProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: (event: any) => void;
  children?: any;
}

function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.disabled}
      type={props.type || 'button'}
      aria-disabled={props.disabled}
      onClick={(event) => props.onClick?.(event)}
      className={props.className}
    >
      {props.children}
    </button>
  );
}

export default Button;
