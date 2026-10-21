"use client";
import * as React from "react";
import { useRef } from "react";

export interface AccordionProps {
  /** ’single’ keeps at most one item open; ’multiple’ allows many */
  type?: "single" | "multiple";
  /**
   * Open item(s): a string for type="single" (’’ when all closed), an array
   * for type="multiple". Used to compute `onValueChange`.
   */
  value?: string | string[];
  /** type="single": allow closing the open item by clicking it again (default true) */
  collapsible?: boolean;
  className?: string;
  id?: string;
  /**
   * Fires with the next value when a trigger that has a `value` is clicked.
   * Lets the root own open state instead of wiring every trigger’s onClick.
   */
  onValueChange?: (value: any) => void;
  children?: any;
}

import { rovingFocus } from "../_internal/dom.ts";

function Accordion(props: AccordionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  function handleKeyDown(event: any) {
    if (
      !event.target.hasAttribute ||
      !event.target.hasAttribute("data-accordion-trigger")
    ) {
      return;
    }
    rovingFocus(event, rootRef.current, "[data-accordion-trigger]", {
      orientation: "vertical",
    });
  }

  function handleClick(event: any) {
    if (!props.onValueChange) return;
    const trigger = event.target.closest
      ? event.target.closest("[data-accordion-trigger]")
      : null;
    if (
      !trigger ||
      trigger.disabled ||
      !rootRef.current ||
      !rootRef.current.contains(trigger)
    )
      return;
    const itemValue = trigger.getAttribute("data-value");
    if (!itemValue) return;
    if (props.type === "multiple") {
      const current: string[] = Array.isArray(props.value) ? props.value : [];
      props.onValueChange(
        current.indexOf(itemValue) >= 0
          ? current.filter((v) => v !== itemValue)
          : current.concat([itemValue])
      );
    } else if (props.value === itemValue) {
      if (props.collapsible !== false) props.onValueChange("");
    } else {
      props.onValueChange(itemValue);
    }
  }

  return (
    <div
      ref={rootRef}
      id={props.id}
      data-type={props.type || "single"}
      onKeyDown={(event) => handleKeyDown(event)}
      onClick={(event) => handleClick(event)}
      className={props.className}
    >
      {props.children}
    </div>
  );
}

export default Accordion;
