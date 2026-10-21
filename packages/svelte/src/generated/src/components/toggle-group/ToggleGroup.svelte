<script context="module" lang="ts">
  export interface ToggleGroupProps {
    /** ’single’ allows one active item, ’multiple’ allows many */
    type?: "single" | "multiple";
    /**
     * Current value — a string for type="single" (’’ when nothing is pressed),
     * an array of strings for type="multiple". Used to compute `onValueChange`.
     */
    value?: string | string[];
    orientation?: "horizontal" | "vertical";
    /** Segmented-control look: items share borders with no gaps */
    attached?: boolean;
    /** Wrap arrow-key navigation from last to first item (default true) */
    loop?: boolean;
    disabled?: boolean;
    className?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    /**
     * Fires with the next value when an item is activated: the item’s value or
     * ’’ (single), or the toggled array (multiple).
     */
    onValueChange?: (value: any) => void;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { toggleGroupVariants } from "./toggle-group.styles.ts";
  import { rovingFocus } from "../_internal/dom.ts";

  export let orientation: ToggleGroupProps["orientation"] = undefined;
  export let attached: ToggleGroupProps["attached"] = undefined;
  export let className: ToggleGroupProps["className"] = undefined;
  export let loop: ToggleGroupProps["loop"] = undefined;
  export let disabled: ToggleGroupProps["disabled"] = undefined;
  export let onValueChange: ToggleGroupProps["onValueChange"] = undefined;
  export let type: ToggleGroupProps["type"] = undefined;
  export let value: ToggleGroupProps["value"] = undefined;

  function handleKeyDown(event: any) {
    rovingFocus(event, groupRef, "button", {
      orientation: orientation === "vertical" ? "vertical" : "horizontal",
      loop: loop !== false,
    });
  }
  function handleClick(event: any) {
    if (disabled || !onValueChange) return;
    const item = event.target.closest
      ? event.target.closest("button[value]")
      : null;
    if (!item || item.disabled || !groupRef || !groupRef.contains(item)) return;
    const itemValue: string = item.getAttribute("value") || "";
    if (type === "multiple") {
      const current: string[] = Array.isArray(value) ? value : [];
      const next =
        current.indexOf(itemValue) >= 0
          ? current.filter((v) => v !== itemValue)
          : current.concat([itemValue]);
      onValueChange(next);
    } else {
      onValueChange(value === itemValue ? "" : itemValue);
    }
  }
  $: classes = () => {
    return cn(
      toggleGroupVariants({
        orientation: orientation,
        attached: !!attached,
      }),
      className
    );
  };

  let groupRef;
</script>

<div
  role="group"
  bind:this={groupRef}
  aria-label={"aria-label"}
  aria-labelledby={"aria-labelledby"}
  aria-disabled={disabled ? true : undefined}
  data-type={type || "single"}
  data-orientation={orientation || "horizontal"}
  on:keydown={(event) => {
    handleKeyDown(event);
  }}
  on:click={(event) => {
    handleClick(event);
  }}
  class={classes()}
>
  <slot />
</div>