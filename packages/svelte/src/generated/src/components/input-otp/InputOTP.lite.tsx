// @ts-nocheck
<script context="module" lang="ts">
  export interface InputOTPProps {
    value?: string;
    /** Number of digits/characters (maxLength). Default 6. */
    length?: number;
    disabled?: boolean;
    name?: string;
    id?: string;
    className?: string;
    placeholder?: string;
    inputMode?: "numeric" | "text";
    "aria-label"?: string;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
    /** Fired on every change with the current value */
    onValueChange?: (value: string) => void;
    /** Fired once the value reaches `length` characters */
    onComplete?: (value: string) => void;
  }
</script>

<script lang="ts">
  export let value: InputOTPProps["value"];
  export let length: InputOTPProps["length"];
  export let inputMode: InputOTPProps["inputMode"];
  export let disabled: InputOTPProps["disabled"];
  export let name: InputOTPProps["name"];
  export let id: InputOTPProps["id"];
  export let placeholder: InputOTPProps["placeholder"];
  export let onValueChange: InputOTPProps["onValueChange"];
  export let onComplete: InputOTPProps["onComplete"];
  export let className: InputOTPProps["className"];
</script>

<input
  type="text"
  autoComplete="one-time-code"
  autoCorrect="off"
  {value}
  maxLength={length || 6}
  inputMode={inputMode || "numeric"}
  spellcheck={false}
  {disabled}
  {name}
  {id}
  {placeholder}
  aria-label={"aria-label" || "One-time code"}
  aria-invalid={"aria-invalid"}
  aria-describedby={"aria-describedby"}
  on:input={(event) => {
    onValueChange?.(event.target.value);
    if (event.target.value.length >= (length || 6)) {
      onComplete?.(event.target.value);
    }
  }}
  class={className}
/>