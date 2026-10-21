"use client";
import * as React from "react";
import { useRef } from "react";

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
  const rootRef = useRef<HTMLDivElement>(null);
  function activeTab() {
    return props.value || props.defaultValue || "";
  }

  function handleClick(event: any) {
    const tab = event.target.closest
      ? event.target.closest('[role="tab"]')
      : null;
    if (
      !tab ||
      tab.disabled ||
      !rootRef.current ||
      !rootRef.current.contains(tab)
    )
      return;
    /* Ignore tabs that belong to a nested Tabs. */
    if (tab.closest("[data-adhar-tabs]") !== rootRef.current) return;
    const value = tab.getAttribute("data-value") || "";
    if (value === activeTab()) return;
    props.onValueChange?.(value);
    props.onChange?.(value);
  }

  return (
    <div
      data-adhar-tabs=""
      ref={rootRef}
      id={props.id}
      data-active-tab={activeTab()}
      data-orientation={props.orientation || "horizontal"}
      onClick={(event) => handleClick(event)}
      className={props.className}
    >
      {props.children}
    </div>
  );
}

export default Tabs;
