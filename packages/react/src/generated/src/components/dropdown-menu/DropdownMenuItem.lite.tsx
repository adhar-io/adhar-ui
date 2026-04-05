// @ts-nocheck
'use client';
import * as React from 'react';

export interface DropdownMenuItemProps {
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children?: any;
}

function DropdownMenuItem(props: DropdownMenuItemProps) {
  return (
    <div
      role='menuitem'
      tabIndex={props.disabled ? -1 : 0}
      aria-disabled={props.disabled}
      onClick={(event) => {
        if (!props.disabled) {
          props.onClick?.();
        }
      }}
      onKeyDown={(event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !props.disabled) {
          event.preventDefault();
          props.onClick?.();
        }
      }}
      className={props.className}
    >
      {props.children}
    </div>
  );
}

export default DropdownMenuItem;
