// @ts-nocheck
<script context="module" lang="ts">
  export interface TextareaProps {
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    rows?: number;
    name?: string;
    id?: string;
    className?: string;
    "aria-label"?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    onChange?: (event: any) => void;
    onFocus?: (event: any) => void;
    onBlur?: (event: any) => void;
  }
</script>

<script lang="ts">
  export let placeholder: TextareaProps["placeholder"];
  export let value: TextareaProps["value"];
  export let disabled: TextareaProps["disabled"];
  export let readonly: TextareaProps["readonly"];
  export let required: TextareaProps["required"];
  export let rows: TextareaProps["rows"];
  export let name: TextareaProps["name"];
  export let id: TextareaProps["id"];
  export let onChange: TextareaProps["onChange"];
  export let onFocus: TextareaProps["onFocus"];
  export let onBlur: TextareaProps["onBlur"];
  export let className: TextareaProps["className"];
</script>

<textarea
  {placeholder}
  {value}
  {disabled}
  readOnly={readonly}
  {required}
  rows={rows || 3}
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