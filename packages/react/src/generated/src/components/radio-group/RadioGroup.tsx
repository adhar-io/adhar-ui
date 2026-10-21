"use client";
import * as React from "react";
import { useRef, useEffect } from "react";

export interface RadioGroupProps {
  /** The value of the currently selected item */
  value?: string;
  /** Submits the selected value under this name */
  name?: string;
  form?: string;
  /** Disables the whole group */
  disabled?: boolean;
  /** Marks the group as required for form validation */
  required?: boolean;
  /** Layout direction — also drives arrow-key navigation */
  orientation?: "horizontal" | "vertical";
  /** Wrap arrow-key navigation from last to first item (default true) */
  loop?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /**
   * Fires with the value of the item the user picked (click, Space, or arrow
   * keys). Lets the group own selection instead of wiring every item’s onSelect.
   */
  onValueChange?: (value: string) => void;
  children?: any;
}

import { cn } from "@adhar-ui/utils";
import { radioGroupVariants } from "./radio-group.styles.ts";
import { rovingFocus, syncTabStops } from "../_internal/dom.ts";

function RadioGroup(props: RadioGroupProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  function classes() {
    return cn(
      radioGroupVariants({
        orientation: props.orientation,
      }),
      props.className
    );
  }

  function syncTabs() {
    syncTabStops(groupRef.current, '[role="radio"]', '[aria-checked="true"]');
  }

  function handleKeyDown(event: any) {
    if (props.disabled) return;
    rovingFocus(event, groupRef.current, '[role="radio"]', {
      orientation: "both",
      loop: props.loop !== false,
      activate: true,
    });
  }

  function handleClick(event: any) {
    if (props.disabled) return;
    const item = event.target.closest
      ? event.target.closest('[role="radio"]')
      : null;
    if (
      !item ||
      item.disabled ||
      !groupRef.current ||
      !groupRef.current.contains(item)
    )
      return;
    props.onValueChange?.(item.getAttribute("value") || "");
  }

  useEffect(() => {
    syncTabs();
  }, []);
  useEffect(() => {
    /* Wait for items to re-render their aria-checked before picking the tab stop. */
    setTimeout(() => syncTabs());
  }, [props.value]);

  return (
    <div
      role="radiogroup"
      ref={groupRef}
      id={props.id}
      aria-label={props["aria-label"]}
      aria-labelledby={props["aria-labelledby"]}
      aria-describedby={props["aria-describedby"]}
      aria-orientation={props.orientation || "vertical"}
      aria-required={props.required ? true : undefined}
      aria-disabled={props.disabled ? true : undefined}
      data-orientation={props.orientation || "vertical"}
      data-disabled={props.disabled ? "" : undefined}
      onKeyDown={(event) => handleKeyDown(event)}
      onClick={(event) => handleClick(event)}
      className={classes()}
    >
      {props.children}
      {props.name ? (
        <input
          type="hidden"
          name={props.name}
          value={props.value || ""}
          form={props.form}
        />
      ) : null}
    </div>
  );
}

export default RadioGroup;
