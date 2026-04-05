// @ts-nocheck
'use client';
import * as React from 'react';

export interface SelectProps {
  value?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  'aria-label'?: string;
  onChange?: (event: any) => void;
  children?: any;
}

function Select(props: SelectProps) {
  return (
    <select
      value={props.value}
      disabled={props.disabled}
      required={props.required}
      name={props.name}
      id={props.id}
      aria-label={props['aria-label']}
      onChange={(event) => props.onChange?.(event)}
      className={props.className}
    >
      {props.children}
    </select>
  );
}

export default Select;
