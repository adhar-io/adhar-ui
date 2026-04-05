// @ts-nocheck
<script context="module" lang="ts">
  export interface SelectProps {
    value?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
    className?: string;
    placeholder?: string;
    "aria-label"?: string;
    onChange?: (event: any) => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let value: SelectProps["value"];
  export let disabled: SelectProps["disabled"];
  export let required: SelectProps["required"];
  export let name: SelectProps["name"];
  export let id: SelectProps["id"];
  export let onChange: SelectProps["onChange"];
  export let className: SelectProps["className"];
</script>

<select
  {value}
  {disabled}
  {required}
  {name}
  {id}
  aria-label={"aria-label"}
  on:change={(event) => {
    onChange?.(event);
  }}
  class={className}><slot /></select
>