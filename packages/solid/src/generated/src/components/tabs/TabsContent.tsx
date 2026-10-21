// @ts-nocheck
import { Show, createSignal, createMemo } from "solid-js";

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
  const classes = createMemo(() => {
    return cn(tabsContentVariants(), props.className);
  });

  return (
    <div
      class={classes()}
      role="tabpanel"
      id={props.id}
      aria-labelledby={props["aria-labelledby"]}
      data-value={props.value}
      data-state={props.active ? "active" : "inactive"}
      hidden={!props.active}
      tabIndex={0}
    >
      <Show when={props.active || props.forceMount}>{props.children}</Show>
    </div>
  );
}

export default TabsContent;
