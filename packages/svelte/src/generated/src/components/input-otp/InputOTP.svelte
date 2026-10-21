<script context="module" lang="ts">
  export interface InputOTPProps {
    /** Controlled value */
    value?: string;
    /** Initial value when uncontrolled */
    defaultValue?: string;
    /** Number of digits/characters (maxLength). Default 6. */
    length?: number;
    disabled?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    name?: string;
    id?: string;
    form?: string;
    size?: "sm" | "default" | "lg";
    className?: string;
    placeholder?: string;
    /**
     * "numeric" (default) shows the number pad and strips non-digits.
     * "text" allows alphanumeric codes.
     */
    inputMode?: "numeric" | "text";
    /** Marks the field as invalid: destructive border + aria-invalid */
    invalid?: boolean;
    "aria-label"?: string;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
    /** Fired on every change with the current value */
    onValueChange?: (value: string) => void;
    /** Fired once each time the value reaches `length` characters */
    onComplete?: (value: string) => void;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { inputOTPVariants } from "./input-otp.styles.ts";

  export let length: InputOTPProps["length"] = undefined;
  export let inputMode: InputOTPProps["inputMode"] = undefined;
  export let size: InputOTPProps["size"] = undefined;
  export let className: InputOTPProps["className"] = undefined;
  export let onValueChange: InputOTPProps["onValueChange"] = undefined;
  export let onComplete: InputOTPProps["onComplete"] = undefined;
  export let value: InputOTPProps["value"] = undefined;
  export let defaultValue: InputOTPProps["defaultValue"] = undefined;
  export let disabled: InputOTPProps["disabled"] = undefined;
  export let required: InputOTPProps["required"] = undefined;
  export let autoFocus: InputOTPProps["autoFocus"] = undefined;
  export let name: InputOTPProps["name"] = undefined;
  export let id: InputOTPProps["id"] = undefined;
  export let form: InputOTPProps["form"] = undefined;
  export let placeholder: InputOTPProps["placeholder"] = undefined;
  export let invalid: InputOTPProps["invalid"] = undefined;

  function handleInput(event: any) {
    const raw: string = event.target.value || "";
    let next = isNumeric() ? raw.replace(/\D/g, "") : raw.replace(/\s/g, "");
    next = next.slice(0, maxLength());
    if (next !== raw) event.target.value = next;
    onValueChange?.(next);
    if (next.length === maxLength() && lastLength < maxLength()) {
      onComplete?.(next);
    }
    lastLength = next.length;
  }
  $: maxLength = () => {
    return length || 6;
  };
  $: isNumeric = () => {
    return inputMode !== "text";
  };
  $: classes = () => {
    return cn(
      inputOTPVariants({
        size: size,
      }),
      className
    );
  };

  let lastLength = 0;
</script>

<input
  type="text"
  autoComplete="one-time-code"
  autoCorrect="off"
  {value}
  {defaultValue}
  maxLength={maxLength()}
  inputMode={isNumeric() ? "numeric" : "text"}
  pattern={isNumeric() ? "[0-9]*" : undefined}
  autoCapitalize={isNumeric() ? undefined : "characters"}
  spellcheck={false}
  {disabled}
  {required}
  {autoFocus}
  {name}
  {id}
  {form}
  {placeholder}
  aria-label={"aria-label" || "One-time code"}
  aria-invalid={invalid || "aria-invalid" ? true : undefined}
  aria-describedby={"aria-describedby"}
  on:input={(event) => {
    handleInput(event);
  }}
  class={classes()}
/>