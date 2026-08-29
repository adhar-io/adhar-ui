// @ts-nocheck
<script context="module" lang="ts">
  export interface CommandInputProps {
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    wrapperClass?: string;
    "aria-label"?: string;
    /** ID of the listbox this input controls (for combobox semantics) */
    "aria-controls"?: string;
    onValueChange?: (value: string) => void;
    onKeyDown?: (event: any) => void;
  }
</script>

<script lang="ts">
  export let wrapperClass: CommandInputProps["wrapperClass"];
  export let placeholder: CommandInputProps["placeholder"];
  export let value: CommandInputProps["value"];
  export let disabled: CommandInputProps["disabled"];
  export let onValueChange: CommandInputProps["onValueChange"];
  export let onKeyDown: CommandInputProps["onKeyDown"];
  export let className: CommandInputProps["className"];
</script>

<div class={wrapperClass}>
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
    aria-label={"aria-label" || "Search"}
    {placeholder}
    {value}
    {disabled}
    spellcheck={false}
    on:input={(event) => {
      onValueChange?.(event.target.value);
    }}
    on:keydown={(event) => {
      onKeyDown?.(event);
    }}
    class={className}
  />
</div>