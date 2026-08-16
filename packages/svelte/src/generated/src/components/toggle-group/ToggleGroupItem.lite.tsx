// @ts-nocheck
<script context="module" lang="ts">
  export interface ToggleGroupItemProps {
    /** The value this item represents within its group */
    value: string;
    /** Whether this item is currently pressed/on */
    pressed?: boolean;
    disabled?: boolean;
    className?: string;
    id?: string;
    "aria-label"?: string;
    /** Fired with this item's value when activated */
    onToggle?: (value: string) => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let id: ToggleGroupItemProps["id"];
  export let value: ToggleGroupItemProps["value"];
  export let pressed: ToggleGroupItemProps["pressed"];
  export let disabled: ToggleGroupItemProps["disabled"];
  export let onToggle: ToggleGroupItemProps["onToggle"];
  export let className: ToggleGroupItemProps["className"];
</script>

<button
  type="button"
  {id}
  {value}
  aria-pressed={pressed ? true : false}
  aria-label={"aria-label"}
  data-state={pressed ? "on" : "off"}
  {disabled}
  on:click={(event) => {
    disabled ? undefined : onToggle?.(value);
  }}
  class={className}><slot /></button
>