<script context="module" lang="ts">
  export interface RadioGroupItemProps {
    /** The value this item represents within its group */
    value: string;
    /** Whether this item is the selected one */
    checked?: boolean;
    disabled?: boolean;
    size?: "sm" | "default" | "lg";
    id?: string;
    className?: string;
    /** Classes for the inner selected-state dot */
    indicatorClass?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
    /** Fired with this item’s value when the user selects it */
    onSelect?: (value: string) => void;
  }

  // Tab order is managed by RadioGroup (roving tabindex): only the checked item,
  // or the first enabled one, is tabbable, and arrow keys move between items.
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import {
    radioGroupIndicatorVariants,
    radioGroupItemVariants,
  } from "./radio-group.styles.ts";

  export let size: RadioGroupItemProps["size"] = undefined;
  export let className: RadioGroupItemProps["className"] = undefined;
  export let indicatorClass: RadioGroupItemProps["indicatorClass"] = undefined;
  export let id: RadioGroupItemProps["id"] = undefined;
  export let value: RadioGroupItemProps["value"];
  export let checked: RadioGroupItemProps["checked"] = undefined;
  export let disabled: RadioGroupItemProps["disabled"] = undefined;
  export let onSelect: RadioGroupItemProps["onSelect"] = undefined;

  $: classes = () => {
    return cn(
      radioGroupItemVariants({
        size: size,
      }),
      className
    );
  };
  $: indicatorClasses = () => {
    return cn(
      radioGroupIndicatorVariants({
        size: size,
      }),
      indicatorClass
    );
  };
</script>

<button
  type="button"
  role="radio"
  {id}
  {value}
  tabIndex={checked ? 0 : -1}
  aria-checked={checked ? true : false}
  aria-label={"aria-label"}
  aria-labelledby={"aria-labelledby"}
  aria-describedby={"aria-describedby"}
  data-state={checked ? "checked" : "unchecked"}
  {disabled}
  on:click={(event) => {
    disabled ? undefined : onSelect?.(value);
  }}
  class={classes()}
>
  {#if checked}
    <span aria-hidden="true" class={indicatorClasses()} />
  {/if}</button
>