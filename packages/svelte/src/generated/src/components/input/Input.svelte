<script context="module" lang="ts">
  export interface InputProps {
    type?: string;
    placeholder?: string;
    /** Controlled value */
    value?: string;
    /** Initial value when uncontrolled */
    defaultValue?: string;
    disabled?: boolean;
    readOnly?: boolean;
    /** @deprecated Use `readOnly` */
    readonly?: boolean;
    required?: boolean;
    /** Marks the field as invalid: destructive border + aria-invalid */
    invalid?: boolean;
    name?: string;
    id?: string;
    form?: string;
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
    /** File inputs: accepted types, e.g. "image/*" */
    accept?: string;
    /** File / email inputs: allow multiple values */
    multiple?: boolean;
    list?: string;
    title?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    "aria-errormessage"?: string;
    onChange?: (event: any) => void;
    onInput?: (event: any) => void;
    /** Fires on every keystroke with the current string value */
    onValueChange?: (value: string) => void;
    onFocus?: (event: any) => void;
    onBlur?: (event: any) => void;
    onKeyDown?: (event: any) => void;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { inputVariants } from "./input.styles.ts";

  export let size: InputProps["size"] = undefined;
  export let variant: InputProps["variant"] = undefined;
  export let className: InputProps["className"] = undefined;
  export let onInput: InputProps["onInput"] = undefined;
  export let onValueChange: InputProps["onValueChange"] = undefined;
  export let type: InputProps["type"] = undefined;
  export let placeholder: InputProps["placeholder"] = undefined;
  export let value: InputProps["value"] = undefined;
  export let defaultValue: InputProps["defaultValue"] = undefined;
  export let disabled: InputProps["disabled"] = undefined;
  export let readOnly: InputProps["readOnly"] = undefined;
  export let readonly: InputProps["readonly"] = undefined;
  export let required: InputProps["required"] = undefined;
  export let name: InputProps["name"] = undefined;
  export let id: InputProps["id"] = undefined;
  export let form: InputProps["form"] = undefined;
  export let autoComplete: InputProps["autoComplete"] = undefined;
  export let inputMode: InputProps["inputMode"] = undefined;
  export let enterKeyHint: InputProps["enterKeyHint"] = undefined;
  export let autoFocus: InputProps["autoFocus"] = undefined;
  export let spellcheck: InputProps["spellcheck"] = undefined;
  export let maxLength: InputProps["maxLength"] = undefined;
  export let minLength: InputProps["minLength"] = undefined;
  export let pattern: InputProps["pattern"] = undefined;
  export let min: InputProps["min"] = undefined;
  export let max: InputProps["max"] = undefined;
  export let step: InputProps["step"] = undefined;
  export let accept: InputProps["accept"] = undefined;
  export let multiple: InputProps["multiple"] = undefined;
  export let list: InputProps["list"] = undefined;
  export let title: InputProps["title"] = undefined;
  export let invalid: InputProps["invalid"] = undefined;
  export let onChange: InputProps["onChange"] = undefined;
  export let onFocus: InputProps["onFocus"] = undefined;
  export let onBlur: InputProps["onBlur"] = undefined;
  export let onKeyDown: InputProps["onKeyDown"] = undefined;

  function handleInput(event: any) {
    onInput?.(event);
    onValueChange?.(event.target.value);
  }
  $: classes = () => {
    return cn(
      inputVariants({
        size: size,
        variant: variant,
      }),
      className
    );
  };
</script>

<input
  type={type || "text"}
  {placeholder}
  {value}
  {defaultValue}
  {disabled}
  readOnly={readOnly || readonly}
  {required}
  {name}
  {id}
  {form}
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
  {accept}
  {multiple}
  {list}
  {title}
  aria-label={"aria-label"}
  aria-labelledby={"aria-labelledby"}
  aria-describedby={"aria-describedby"}
  aria-invalid={invalid || "aria-invalid" ? true : undefined}
  aria-errormessage={"aria-errormessage"}
  on:change={(event) => {
    onChange?.(event);
  }}
  on:input={(event) => {
    handleInput(event);
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
  class={classes()}
/>