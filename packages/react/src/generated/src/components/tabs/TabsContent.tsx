import * as React from "react";

export interface TabsContentProps {
  value: string;
  active?: boolean;
  /** Keep inactive panels mounted (hidden) to preserve their state */
  forceMount?: boolean;
  className?: string;
  id?: string;
  /** ID of the TabsTrigger that labels this panel */
  "aria-labelledby"?: string;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { tabsContentVariants } from "./tabs.styles.ts";

function TabsContent(props: TabsContentProps) {
  function classes() {
    return cn(tabsContentVariants(), props.className);
  }

  return (
    <div
      role="tabpanel"
      id={props.id}
      aria-labelledby={props["aria-labelledby"]}
      data-value={props.value}
      data-state={props.active ? "active" : "inactive"}
      hidden={!props.active}
      tabIndex={0}
      className={classes()}
    >
      {props.active || props.forceMount ? <>{props.children}</> : null}
    </div>
  );
}

export default TabsContent;
