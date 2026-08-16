// @ts-nocheck
import { Show } from "solid-js";

export interface TabsContentProps {
  value: string;
  active?: boolean;
  className?: string;
  children?: any;
}

function TabsContent(props: TabsContentProps) {
  return (
    <div
      class={props.className}
      role="tabpanel"
      data-value={props.value}
      hidden={!props.active}
      tabIndex={0}
    >
      <Show when={props.active}>{props.children}</Show>
    </div>
  );
}

export default TabsContent;
