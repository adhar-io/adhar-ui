// @ts-nocheck
<script context="module" lang="ts">
  export interface RadioGroupItemProps {
    /** The value this item represents within its group */
    value: string;
    /** Whether this item is the selected one */
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    className?: string;
    /** Classes for the inner selected-state dot */
    indicatorClass?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    /** Fired with this item's value when the user selects it */
    onSelect?: (value: string) => void;
  }
</script>

<script lang="ts">
  export let id: RadioGroupItemProps["id"];
  export let value: RadioGroupItemProps["value"];
  export let checked: RadioGroupItemProps["checked"];
  export let disabled: RadioGroupItemProps["disabled"];
  export let onSelect: RadioGroupItemProps["onSelect"];
  export let className: RadioGroupItemProps["className"];
  export let indicatorClass: RadioGroupItemProps["indicatorClass"];
</script>

<button
  type="button"
  role="radio"
  {id}
  {value}
  aria-checked={checked ? true : false}
  aria-label={"aria-label"}
  aria-labelledby={"aria-labelledby"}
  {disabled}
  on:click={(event) => {
    disabled ? undefined : onSelect?.(value);
  }}
  on:keydown={(event) => {
    if ((event.key === " " || event.key === "Enter") && !disabled) {
      event.preventDefault();
      onSelect?.(value);
    }
  }}
  class={className}
>
  {#if checked}
    <span aria-hidden="true" class={indicatorClass} />
  {/if}</button
>