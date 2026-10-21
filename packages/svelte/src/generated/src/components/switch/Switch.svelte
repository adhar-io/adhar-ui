<script context="module" lang="ts">
  export interface SwitchProps {
    /** Controlled checked state */
    checked?: boolean;
    /** Initial checked state when uncontrolled */
    defaultChecked?: boolean;
    disabled?: boolean;
    required?: boolean;
    size?: "sm" | "default" | "lg";
    /** Submits `value` (default "on") under this name when checked */
    name?: string;
    value?: string;
    form?: string;
    id?: string;
    className?: string;
    thumbClass?: string;
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
  import { cn } from "@adhar-ui/utils";
  import { switchThumbVariants, switchVariants } from "./switch.styles.ts";

  export let defaultChecked: SwitchProps["defaultChecked"] = undefined;
  export let checked: SwitchProps["checked"] = undefined;
  export let size: SwitchProps["size"] = undefined;
  export let className: SwitchProps["className"] = undefined;
  export let thumbClass: SwitchProps["thumbClass"] = undefined;
  export let disabled: SwitchProps["disabled"] = undefined;
  export let onChange: SwitchProps["onChange"] = undefined;
  export let onCheckedChange: SwitchProps["onCheckedChange"] = undefined;
  export let id: SwitchProps["id"] = undefined;
  export let required: SwitchProps["required"] = undefined;
  export let name: SwitchProps["name"] = undefined;
  export let value: SwitchProps["value"] = undefined;
  export let form: SwitchProps["form"] = undefined;

  function handleClick() {
    if (disabled) return;
    const next = !isChecked();
    internalChecked = next;
    onChange?.(next);
    onCheckedChange?.(next);
  }
  $: isChecked = () => {
    return checked !== undefined ? !!checked : internalChecked;
  };
  $: dataState = () => {
    return isChecked() ? "checked" : "unchecked";
  };
  $: classes = () => {
    return cn(
      switchVariants({
        size: size,
      }),
      className
    );
  };
  $: thumbClasses = () => {
    return cn(
      switchThumbVariants({
        size: size,
      }),
      thumbClass
    );
  };

  let internalChecked = false;
  internalChecked = !!defaultChecked;
</script>

<button
  type="button"
  role="switch"
  {id}
  aria-checked={isChecked()}
  aria-required={required ? true : undefined}
  aria-label={"aria-label"}
  aria-labelledby={"aria-labelledby"}
  aria-describedby={"aria-describedby"}
  data-state={dataState()}
  {disabled}
  on:click={(event) => {
    handleClick();
  }}
  class={classes()}
  ><span data-state={dataState()} class={thumbClasses()} />
  {#if name && isChecked()}
    <input type="hidden" {name} value={value || "on"} {form} />
  {/if}</button
>