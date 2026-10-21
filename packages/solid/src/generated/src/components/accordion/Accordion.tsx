// @ts-nocheck
import { createSignal, createMemo } from "solid-js";

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
  function handleKeyDown(event: any) {
    if (
      !event.target.hasAttribute ||
      !event.target.hasAttribute("data-accordion-trigger")
    ) {
      return;
    }
    rovingFocus(event, rootRef, "[data-accordion-trigger]", {
      orientation: "vertical",
    });
  }

  function handleClick(event: any) {
    if (!props.onValueChange) return;
    const trigger = event.target.closest
      ? event.target.closest("[data-accordion-trigger]")
      : null;
    if (!trigger || trigger.disabled || !rootRef || !rootRef.contains(trigger))
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

  let rootRef: HTMLDivElement;

  return (
    <div
      class={props.className}
      ref={rootRef!}
      id={props.id}
      data-type={props.type || "single"}
      onKeyDown={(event) => handleKeyDown(event)}
      onClick={(event) => handleClick(event)}
    >
      {props.children}
    </div>
  );
}

export default Accordion;
