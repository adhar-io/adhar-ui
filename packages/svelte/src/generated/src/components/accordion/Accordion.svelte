<script context="module" lang="ts">
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
</script>

<script lang="ts">
  import { rovingFocus } from "../_internal/dom.ts";

  export let onValueChange: AccordionProps["onValueChange"] = undefined;
  export let type: AccordionProps["type"] = undefined;
  export let value: AccordionProps["value"] = undefined;
  export let collapsible: AccordionProps["collapsible"] = undefined;
  export let id: AccordionProps["id"] = undefined;
  export let className: AccordionProps["className"] = undefined;

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
    if (!onValueChange) return;
    const trigger = event.target.closest
      ? event.target.closest("[data-accordion-trigger]")
      : null;
    if (!trigger || trigger.disabled || !rootRef || !rootRef.contains(trigger))
      return;
    const itemValue = trigger.getAttribute("data-value");
    if (!itemValue) return;
    if (type === "multiple") {
      const current: string[] = Array.isArray(value) ? value : [];
      onValueChange(
        current.indexOf(itemValue) >= 0
          ? current.filter((v) => v !== itemValue)
          : current.concat([itemValue])
      );
    } else if (value === itemValue) {
      if (collapsible !== false) onValueChange("");
    } else {
      onValueChange(itemValue);
    }
  }

  let rootRef;
</script>

<div
  bind:this={rootRef}
  {id}
  data-type={type || "single"}
  on:keydown={(event) => {
    handleKeyDown(event);
  }}
  on:click={(event) => {
    handleClick(event);
  }}
  class={className}
>
  <slot />
</div>