<script context="module" lang="ts">
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
</script>

<script lang="ts">
  import { onMount } from "svelte";

  import { cn } from "@adhar-ui/utils";
  import { radioGroupVariants } from "./radio-group.styles.ts";
  import { rovingFocus, syncTabStops } from "../_internal/dom.ts";

  export let value: RadioGroupProps["value"] = undefined;
  export let orientation: RadioGroupProps["orientation"] = undefined;
  export let className: RadioGroupProps["className"] = undefined;
  export let disabled: RadioGroupProps["disabled"] = undefined;
  export let loop: RadioGroupProps["loop"] = undefined;
  export let onValueChange: RadioGroupProps["onValueChange"] = undefined;
  export let id: RadioGroupProps["id"] = undefined;
  export let required: RadioGroupProps["required"] = undefined;

  export let name: RadioGroupProps["name"] = undefined;
  export let form: RadioGroupProps["form"] = undefined;

  function syncTabs() {
    syncTabStops(groupRef, '[role="radio"]', '[aria-checked="true"]');
  }
  function handleKeyDown(event: any) {
    if (disabled) return;
    rovingFocus(event, groupRef, '[role="radio"]', {
      orientation: "both",
      loop: loop !== false,
      activate: true,
    });
  }
  function handleClick(event: any) {
    if (disabled) return;
    const item = event.target.closest
      ? event.target.closest('[role="radio"]')
      : null;
    if (!item || item.disabled || !groupRef || !groupRef.contains(item)) return;
    onValueChange?.(item.getAttribute("value") || "");
  }
  $: classes = () => {
    return cn(
      radioGroupVariants({
        orientation: orientation,
      }),
      className
    );
  };

  let groupRef;

  onMount(() => {
    syncTabs();
  });

  function onUpdateFn_0(..._args: any[]) {
    /* Wait for items to re-render their aria-checked before picking the tab stop. */
    setTimeout(() => syncTabs());
  }

  $: onUpdateFn_0(...[value]);
</script>

<div
  role="radiogroup"
  bind:this={groupRef}
  {id}
  aria-label={"aria-label"}
  aria-labelledby={"aria-labelledby"}
  aria-describedby={"aria-describedby"}
  aria-orientation={orientation || "vertical"}
  aria-required={required ? true : undefined}
  aria-disabled={disabled ? true : undefined}
  data-orientation={orientation || "vertical"}
  data-disabled={disabled ? "" : undefined}
  on:keydown={(event) => {
    handleKeyDown(event);
  }}
  on:click={(event) => {
    handleClick(event);
  }}
  class={classes()}
>
  <slot />
  {#if name}
    <input type="hidden" {name} value={value || ""} {form} />
  {/if}
</div>