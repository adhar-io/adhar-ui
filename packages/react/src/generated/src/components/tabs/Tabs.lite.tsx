// @ts-nocheck
import { useLocalProxy } from '../../../../runtime.ts';
'use client';
import * as React from 'react';

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
  children?: any;
}

function Tabs(props: TabsProps) {
  const state = useLocalProxy({ activeTab: null });

  return (
    <div data-active-tab={state.activeTab} className={props.className}>
      {props.children}
    </div>
  );
}

export default Tabs;
