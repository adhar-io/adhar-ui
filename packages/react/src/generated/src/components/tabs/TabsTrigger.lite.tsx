// @ts-nocheck
'use client';
import * as React from 'react';

export interface TabsTriggerProps {
  value: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (value: string) => void;
  children?: any;
}

function TabsTrigger(props: TabsTriggerProps) {
  return (
    <button
      type='button'
      role='tab'
      aria-selected={props.active}
      disabled={props.disabled}
      tabIndex={props.active ? 0 : -1}
      data-value={props.value}
      onClick={(event) => props.onClick?.(props.value)}
      className={props.className}
    >
      {props.children}
    </button>
  );
}

export default TabsTrigger;
