// @ts-nocheck
import { useLocalProxy } from '../../../../runtime.ts';
'use client';
import * as React from 'react';

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  thumbClass?: string;
  'aria-label'?: string;
  onChange?: (checked: boolean) => void;
}

function Switch(props: SwitchProps) {
  const state = useLocalProxy({
    isChecked: null,
    handleClick: null,
    handleKeyDown: null,
  });

  return (
    <button
      type='button'
      role='switch'
      id={props.id}
      aria-checked={state.isChecked}
      aria-label={props['aria-label']}
      disabled={props.disabled}
      onClick={(event) => state.handleClick()}
      onKeyDown={(event) => state.handleKeyDown(event)}
      className={props.className}
    >
      <span className={props.thumbClass} />
    </button>
  );
}

export default Switch;
