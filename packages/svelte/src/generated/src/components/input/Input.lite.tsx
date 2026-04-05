// @ts-nocheck
<script context="module" lang="ts">
  export interface InputProps {
    type?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
    className?: string;
    size?: "sm" | "default" | "lg";
    "aria-label"?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    onChange?: (event: any) => void;
    onFocus?: (event: any) => void;
    onBlur?: (event: any) => void;
  }
</script>

<script lang="ts">
  export let type: InputProps["type"];
  export let placeholder: InputProps["placeholder"];
  export let value: InputProps["value"];
  export let disabled: InputProps["disabled"];
  export let readonly: InputProps["readonly"];
  export let required: InputProps["required"];
  export let name: InputProps["name"];
  export let id: InputProps["id"];
  export let onChange: InputProps["onChange"];
  export let onFocus: InputProps["onFocus"];
  export let onBlur: InputProps["onBlur"];
  export let className: InputProps["className"];
</script>

<input
  type={type || "text"}
  {placeholder}
  {value}
  {disabled}
  readOnly={readonly}
  {required}
  {name}
  {id}
  aria-label={"aria-label"}
  aria-describedby={"aria-describedby"}
  aria-invalid={"aria-invalid"}
  on:change={(event) => {
    onChange?.(event);
  }}
  on:focus={(event) => {
    onFocus?.(event);
  }}
  on:blur={(event) => {
    onBlur?.(event);
  }}
  class={className}
/>