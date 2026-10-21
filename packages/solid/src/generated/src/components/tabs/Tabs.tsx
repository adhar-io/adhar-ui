// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

export interface TabsProps {
  /** The active tab’s value */
  value?: string;
  /** @deprecated Pass `value`; kept for data-active-tab on first render */
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  id?: string;
  /**
   * Fires with a tab’s value when the user activates it (click, or arrow keys
   * in TabsList). Lets the root own selection instead of every trigger’s onClick.
   */
  onValueChange?: (value: string) => void;
  /** Alias of `onValueChange` */
  onChange?: (value: string) => void;
  children?: any;
}

function Tabs(props: TabsProps) {
  const activeTab = createMemo(() => {
    return props.value || props.defaultValue || "";
  });

  function handleClick(event: any) {
    const tab = event.target.closest
      ? event.target.closest('[role="tab"]')
      : null;
    if (!tab || tab.disabled || !rootRef || !rootRef.contains(tab)) return;
    /* Ignore tabs that belong to a nested Tabs. */
    if (tab.closest("[data-adhar-tabs]") !== rootRef) return;
    const value = tab.getAttribute("data-value") || "";
    if (value === activeTab()) return;
    props.onValueChange?.(value);
    props.onChange?.(value);
  }

  let rootRef: HTMLDivElement;

  return (
    <div
      class={props.className}
      data-adhar-tabs=""
      ref={rootRef!}
      id={props.id}
      data-active-tab={activeTab()}
      data-orientation={props.orientation || "horizontal"}
      onClick={(event) => handleClick(event)}
    >
      {props.children}
    </div>
  );
}

export default Tabs;
