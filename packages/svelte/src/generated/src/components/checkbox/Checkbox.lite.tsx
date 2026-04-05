// @ts-nocheck
<script context="module" lang="ts">
  export interface CheckboxProps {
    checked?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
    value?: string;
    className?: string;
    "aria-label"?: string;
    onChange?: (checked: boolean) => void;
  }
</script>

<script lang="ts">
  export let disabled: CheckboxProps["disabled"];
  export let required: CheckboxProps["required"];
  export let name: CheckboxProps["name"];
  export let id: CheckboxProps["id"];
  export let value: CheckboxProps["value"];
  export let className: CheckboxProps["className"];
</script>

<input
  type="checkbox"
  role="checkbox"
  checked={state.isChecked}
  {disabled}
  {required}
  {name}
  {id}
  {value}
  aria-checked={state.isChecked}
  aria-label={"aria-label"}
  on:change={(event) => {
    state.handleChange(event);
  }}
  class={className}
/>