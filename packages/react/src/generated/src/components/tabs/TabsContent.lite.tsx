// @ts-nocheck
import * as React from "react";

export interface TabsContentProps {
  value: string;
  active?: boolean;
  className?: string;
  children?: any;
}

function TabsContent(props: TabsContentProps) {
  return (
    <div
      role="tabpanel"
      data-value={props.value}
      hidden={!props.active}
      tabIndex={0}
      className={props.className}
    >
      {props.active ? <>{props.children}</> : null}
    </div>
  );
}

export default TabsContent;
