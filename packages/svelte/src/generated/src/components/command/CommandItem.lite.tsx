// @ts-nocheck
<script context="module" lang="ts">
  export interface CommandItemProps {
    /** The value this item represents (passed to onSelect) */
    value?: string;
    /** Whether this item is the active/highlighted option */
    selected?: boolean;
    disabled?: boolean;
    id?: string;
    className?: string;
    onSelect?: (value: string) => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let id: CommandItemProps["id"];
  export let selected: CommandItemProps["selected"];
  export let disabled: CommandItemProps["disabled"];
  export let onSelect: CommandItemProps["onSelect"];
  export let value: CommandItemProps["value"];
  export let className: CommandItemProps["className"];
</script>

<div
  role="option"
  {id}
  tabIndex={-1}
  aria-selected={selected ? true : false}
  aria-disabled={disabled ? true : false}
  data-selected={selected ? "true" : "false"}
  on:click={(event) => {
    disabled ? undefined : onSelect?.(value || "");
  }}
  class={className}
>
  <slot />
</div>