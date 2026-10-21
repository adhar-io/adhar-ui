<script context="module" lang="ts">
  export interface SelectProps {
    /** Controlled value */
    value?: string;
    /** Initial value when uncontrolled */
    defaultValue?: string;
    disabled?: boolean;
    required?: boolean;
    /** Marks the field as invalid: destructive border + aria-invalid */
    invalid?: boolean;
    name?: string;
    id?: string;
    form?: string;
    size?: "sm" | "default" | "lg";
    className?: string;
    /**
     * Text shown while nothing is selected. Rendered as an empty-valued option,
     * so `required` validation fails until the user picks a real option.
     */
    placeholder?: string;
    autoComplete?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
    onChange?: (event: any) => void;
    /** Fires with the newly selected option’s value */
    onValueChange?: (value: string) => void;
    onBlur?: (event: any) => void;
    /** <option> / <optgroup> elements */
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { selectTriggerVariants } from "./select.styles.ts";

  export let size: SelectProps["size"] = undefined;
  export let className: SelectProps["className"] = undefined;
  export let onChange: SelectProps["onChange"] = undefined;
  export let onValueChange: SelectProps["onValueChange"] = undefined;
  export let value: SelectProps["value"] = undefined;
  export let defaultValue: SelectProps["defaultValue"] = undefined;
  export let disabled: SelectProps["disabled"] = undefined;
  export let required: SelectProps["required"] = undefined;
  export let name: SelectProps["name"] = undefined;
  export let id: SelectProps["id"] = undefined;
  export let form: SelectProps["form"] = undefined;
  export let autoComplete: SelectProps["autoComplete"] = undefined;
  export let invalid: SelectProps["invalid"] = undefined;
  export let onBlur: SelectProps["onBlur"] = undefined;
  export let placeholder: SelectProps["placeholder"] = undefined;

  function handleChange(event: any) {
    onChange?.(event);
    onValueChange?.(event.target.value);
  }
  $: classes = () => {
    return cn(
      selectTriggerVariants({
        size: size,
      }),
      className
    );
  };
</script>

<select
  {value}
  {defaultValue}
  {disabled}
  {required}
  {name}
  {id}
  {form}
  {autoComplete}
  aria-label={"aria-label"}
  aria-labelledby={"aria-labelledby"}
  aria-describedby={"aria-describedby"}
  aria-invalid={invalid ? true : undefined}
  on:change={(event) => {
    handleChange(event);
  }}
  on:blur={(event) => {
    onBlur?.(event);
  }}
  class={classes()}
>
  {#if placeholder}
    <option value="" hidden={true}>{placeholder}</option>
  {/if}<slot /></select
>