// @ts-nocheck
<script context="module" lang="ts">
  export interface TabsTriggerProps {
    value: string;
    active?: boolean;
    disabled?: boolean;
    className?: string;
    onClick?: (value: string) => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let active: TabsTriggerProps["active"];
  export let disabled: TabsTriggerProps["disabled"];
  export let value: TabsTriggerProps["value"];
  export let onClick: TabsTriggerProps["onClick"];
  export let className: TabsTriggerProps["className"];
</script>

<button
  type="button"
  role="tab"
  aria-selected={active}
  {disabled}
  tabIndex={active ? 0 : -1}
  data-value={value}
  on:click={(event) => {
    onClick?.(value);
  }}
  class={className}><slot /></button
>