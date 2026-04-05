// @ts-nocheck
import { useLocalProxy } from '../../../../runtime.ts';
'use client';
import * as React from 'react';

export interface DialogProps {
  open?: boolean;
  className?: string;
  overlayClass?: string;
  contentClass?: string;
  onClose?: () => void;
  children?: any;
}

function Dialog(props: DialogProps) {
  const state = useLocalProxy({
    handleOverlayClick: null,
    handleKeyDown: null,
  });

  return (
    <div>
      {props.open
        ? (
          <div
            onClick={(event) => state.handleOverlayClick(event)}
            onKeyDown={(event) => state.handleKeyDown(event)}
            className={props.overlayClass}
          >
            <div
              role='dialog'
              aria-modal='true'
              tabIndex={-1}
              className={props.contentClass}
            >
              {props.children}
            </div>
          </div>
        )
        : null}
    </div>
  );
}

export default Dialog;
