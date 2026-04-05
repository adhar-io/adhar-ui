// @ts-nocheck
'use client';
import * as React from 'react';

export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  onChange?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
}

function Input(props: InputProps) {
  return (
    <input
      type={props.type || 'text'}
      placeholder={props.placeholder}
      value={props.value}
      disabled={props.disabled}
      readOnly={props.readonly}
      required={props.required}
      name={props.name}
      id={props.id}
      aria-label={props['aria-label']}
      aria-describedby={props['aria-describedby']}
      aria-invalid={props['aria-invalid']}
      onChange={(event) => props.onChange?.(event)}
      onFocus={(event) => props.onFocus?.(event)}
      onBlur={(event) => props.onBlur?.(event)}
      className={props.className}
    />
  );
}

export default Input;
