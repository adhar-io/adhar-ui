// @ts-nocheck
import * as React from 'react';

export interface TabsListProps {
  className?: string;
  children?: any;
}

function TabsList(props: TabsListProps) {
  return (
    <div role='tablist' className={props.className}>
      {props.children}
    </div>
  );
}

export default TabsList;
