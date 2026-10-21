<script context="module" lang="ts">
  export interface CommandInputProps {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    className?: string;
    wrapperClass?: string;
    "aria-label"?: string;
    /** ID of the listbox this input controls (for combobox semantics) */
    "aria-controls"?: string;
    /** ID of the highlighted CommandItem, so screen readers follow the highlight */
    "aria-activedescendant"?: string;
    onValueChange?: (value: string) => void;
    onKeyDown?: (event: any) => void;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import {
    commandInputVariants,
    commandInputWrapperVariants,
  } from "./command.styles.ts";

  export let className: CommandInputProps["className"] = undefined;
  export let wrapperClass: CommandInputProps["wrapperClass"] = undefined;
  export let onValueChange: CommandInputProps["onValueChange"] = undefined;
  export let placeholder: CommandInputProps["placeholder"] = undefined;
  export let value: CommandInputProps["value"] = undefined;
  export let disabled: CommandInputProps["disabled"] = undefined;
  export let autoFocus: CommandInputProps["autoFocus"] = undefined;
  export let onKeyDown: CommandInputProps["onKeyDown"] = undefined;

  function handleInput(event: any) {
    onValueChange?.(event.target.value);
  }
  $: classes = () => {
    return cn(commandInputVariants(), className);
  };
  $: wrapperClasses = () => {
    return cn(commandInputWrapperVariants(), wrapperClass);
  };
</script>

<div class={wrapperClasses()}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    class="shrink-0 text-muted-foreground"
    ><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg
  ><input
    type="text"
    role="combobox"
    aria-expanded="true"
    aria-autocomplete="list"
    autoComplete="off"
    autoCorrect="off"
    aria-controls={"aria-controls"}
    aria-activedescendant={"aria-activedescendant"}
    aria-label={"aria-label" || "Search"}
    {placeholder}
    {value}
    {disabled}
    {autoFocus}
    spellcheck={false}
    on:input={(event) => {
      handleInput(event);
    }}
    on:keydown={(event) => {
      onKeyDown?.(event);
    }}
    class={classes()}
  />
</div>