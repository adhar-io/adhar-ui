<script context="module" lang="ts">
  export interface CheckboxProps {
    /** Controlled checked state */
    checked?: boolean;
    /** Initial checked state when uncontrolled */
    defaultChecked?: boolean;
    /** Shows the mixed (dash) state, e.g. for a "select all" with some rows selected */
    indeterminate?: boolean;
    disabled?: boolean;
    required?: boolean;
    /** Marks the field as invalid: destructive ring + aria-invalid */
    invalid?: boolean;
    size?: "sm" | "default" | "lg";
    name?: string;
    id?: string;
    form?: string;
    value?: string;
    className?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
    /** Fires with the next checked state */
    onChange?: (checked: boolean) => void;
    /** Alias of `onChange` */
    onCheckedChange?: (checked: boolean) => void;
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";

  import { cn } from "@adhar-ui/utils";
  import { checkboxVariants } from "./checkbox.styles.ts";

  export let defaultChecked: CheckboxProps["defaultChecked"] = undefined;
  export let indeterminate: CheckboxProps["indeterminate"] = undefined;
  export let checked: CheckboxProps["checked"] = undefined;
  export let size: CheckboxProps["size"] = undefined;
  export let className: CheckboxProps["className"] = undefined;
  export let onChange: CheckboxProps["onChange"] = undefined;
  export let onCheckedChange: CheckboxProps["onCheckedChange"] = undefined;
  export let disabled: CheckboxProps["disabled"] = undefined;
  export let required: CheckboxProps["required"] = undefined;
  export let name: CheckboxProps["name"] = undefined;
  export let id: CheckboxProps["id"] = undefined;
  export let form: CheckboxProps["form"] = undefined;
  export let value: CheckboxProps["value"] = undefined;
  export let invalid: CheckboxProps["invalid"] = undefined;

  function syncIndeterminate() {
    if (inputRef) inputRef.indeterminate = !!indeterminate;
  }
  function handleChange(event: any) {
    const next = !!event.target.checked;
    internalChecked = next;
    onChange?.(next);
    onCheckedChange?.(next);
  }
  $: isChecked = () => {
    return checked !== undefined ? !!checked : internalChecked;
  };
  $: classes = () => {
    return cn(
      checkboxVariants({
        size: size,
      }),
      className
    );
  };
  $: dataState = () => {
    if (indeterminate) return "indeterminate";
    return isChecked() ? "checked" : "unchecked";
  };

  let inputRef;

  let internalChecked = false;
  internalChecked = !!defaultChecked;

  onMount(() => {
    syncIndeterminate();
  });

  function onUpdateFn_0(..._args: any[]) {
    syncIndeterminate();
  }

  $: onUpdateFn_0(...[indeterminate]);
</script>

<input
  type="checkbox"
  bind:this={inputRef}
  checked={isChecked()}
  {disabled}
  {required}
  {name}
  {id}
  {form}
  {value}
  data-state={dataState()}
  aria-checked={indeterminate ? "mixed" : undefined}
  aria-invalid={invalid ? true : undefined}
  aria-label={"aria-label"}
  aria-labelledby={"aria-labelledby"}
  aria-describedby={"aria-describedby"}
  on:change={(event) => {
    handleChange(event);
  }}
  class={classes()}
/>