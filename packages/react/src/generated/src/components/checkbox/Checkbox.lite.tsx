// @ts-nocheck
import { useLocalProxy } from '../../../../runtime.ts';
'use client';
import * as React from 'react';

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  value?: string;
  className?: string;
  'aria-label'?: string;
  onChange?: (checked: boolean) => void;
}

function Checkbox(props: CheckboxProps) {
  const state = useLocalProxy({ isChecked: null, handleChange: null });

  return (
    <input
      type='checkbox'
      role='checkbox'
      checked={state.isChecked}
      disabled={props.disabled}
      required={props.required}
      name={props.name}
      id={props.id}
      value={props.value}
      aria-checked={state.isChecked}
      aria-label={props['aria-label']}
      onChange={(event) => state.handleChange(event)}
      className={props.className}
    />
  );
}

export default Checkbox;
