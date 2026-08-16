// @ts-nocheck
<script context="module" lang="ts">
  export interface InputProps {
    type?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
    className?: string;
    size?: "sm" | "default" | "lg";
    variant?: "default" | "ghost" | "flush";
    /** Native autocomplete hint (e.g. "email", "current-password", "off") */
    autoComplete?: string;
    /** Virtual keyboard hint on touch devices */
    inputMode?:
      | "none"
      | "text"
      | "decimal"
      | "numeric"
      | "tel"
      | "search"
      | "email"
      | "url";
    /** Enter-key label on virtual keyboards */
    enterKeyHint?:
      | "enter"
      | "done"
      | "go"
      | "next"
      | "previous"
      | "search"
      | "send";
    autoFocus?: boolean;
    spellcheck?: boolean;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    /** Min value / date for numeric & date inputs */
    min?: string | number;
    /** Max value / date for numeric & date inputs */
    max?: string | number;
    /** Step increment for numeric & date inputs */
    step?: string | number;
    list?: string;
    "aria-label"?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    "aria-errormessage"?: string;
    onChange?: (event: any) => void;
    onInput?: (event: any) => void;
    onFocus?: (event: any) => void;
    onBlur?: (event: any) => void;
    onKeyDown?: (event: any) => void;
  }
</script>

<script lang="ts">
  export let type: InputProps["type"];
  export let placeholder: InputProps["placeholder"];
  export let value: InputProps["value"];
  export let defaultValue: InputProps["defaultValue"];
  export let disabled: InputProps["disabled"];
  export let readonly: InputProps["readonly"];
  export let required: InputProps["required"];
  export let name: InputProps["name"];
  export let id: InputProps["id"];
  export let autoComplete: InputProps["autoComplete"];
  export let inputMode: InputProps["inputMode"];
  export let enterKeyHint: InputProps["enterKeyHint"];
  export let autoFocus: InputProps["autoFocus"];
  export let spellcheck: InputProps["spellcheck"];
  export let maxLength: InputProps["maxLength"];
  export let minLength: InputProps["minLength"];
  export let pattern: InputProps["pattern"];
  export let min: InputProps["min"];
  export let max: InputProps["max"];
  export let step: InputProps["step"];
  export let list: InputProps["list"];
  export let onChange: InputProps["onChange"];
  export let onInput: InputProps["onInput"];
  export let onFocus: InputProps["onFocus"];
  export let onBlur: InputProps["onBlur"];
  export let onKeyDown: InputProps["onKeyDown"];
  export let className: InputProps["className"];
</script>

<input
  type={type || "text"}
  {placeholder}
  {value}
  {defaultValue}
  {disabled}
  readOnly={readonly}
  {required}
  {name}
  {id}
  {autoComplete}
  {inputMode}
  {enterKeyHint}
  {autoFocus}
  {spellcheck}
  {maxLength}
  {minLength}
  {pattern}
  {min}
  {max}
  {step}
  {list}
  aria-label={"aria-label"}
  aria-describedby={"aria-describedby"}
  aria-invalid={"aria-invalid"}
  aria-errormessage={"aria-errormessage"}
  on:change={(event) => {
    onChange?.(event);
  }}
  on:input={(event) => {
    onInput?.(event);
  }}
  on:focus={(event) => {
    onFocus?.(event);
  }}
  on:blur={(event) => {
    onBlur?.(event);
  }}
  on:keydown={(event) => {
    onKeyDown?.(event);
  }}
  class={className}
/>