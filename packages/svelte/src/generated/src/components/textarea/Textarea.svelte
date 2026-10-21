<script context="module" lang="ts">
  export interface TextareaProps {
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
    rows?: number;
    maxLength?: number;
    minLength?: number;
    /** Grow with the content instead of scrolling (up to `maxRows` if set) */
    autoResize?: boolean;
    /** Row cap for `autoResize` */
    maxRows?: number;
    size?: "sm" | "default" | "lg";
    name?: string;
    id?: string;
    form?: string;
    autoFocus?: boolean;
    spellcheck?: boolean;
    className?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
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
  import { onMount } from "svelte";

  import { cn } from "@adhar-ui/utils";
  import { textareaVariants } from "./textarea.styles.ts";

  export let value: TextareaProps["value"] = undefined;
  export let size: TextareaProps["size"] = undefined;
  export let autoResize: TextareaProps["autoResize"] = undefined;
  export let className: TextareaProps["className"] = undefined;
  export let maxRows: TextareaProps["maxRows"] = undefined;
  export let onInput: TextareaProps["onInput"] = undefined;
  export let onValueChange: TextareaProps["onValueChange"] = undefined;
  export let placeholder: TextareaProps["placeholder"] = undefined;
  export let defaultValue: TextareaProps["defaultValue"] = undefined;
  export let disabled: TextareaProps["disabled"] = undefined;
  export let readOnly: TextareaProps["readOnly"] = undefined;
  export let readonly: TextareaProps["readonly"] = undefined;
  export let required: TextareaProps["required"] = undefined;
  export let rows: TextareaProps["rows"] = undefined;
  export let maxLength: TextareaProps["maxLength"] = undefined;
  export let minLength: TextareaProps["minLength"] = undefined;
  export let name: TextareaProps["name"] = undefined;
  export let id: TextareaProps["id"] = undefined;
  export let form: TextareaProps["form"] = undefined;
  export let autoFocus: TextareaProps["autoFocus"] = undefined;
  export let spellcheck: TextareaProps["spellcheck"] = undefined;
  export let invalid: TextareaProps["invalid"] = undefined;
  export let onChange: TextareaProps["onChange"] = undefined;
  export let onFocus: TextareaProps["onFocus"] = undefined;
  export let onBlur: TextareaProps["onBlur"] = undefined;
  export let onKeyDown: TextareaProps["onKeyDown"] = undefined;

  function resize() {
    const el = textareaRef;
    if (!autoResize || !el) return;
    el.style.height = "auto";
    let next = el.scrollHeight;
    if (maxRows) {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20;
      const cap =
        lineHeight * maxRows + (el.offsetHeight - el.clientHeight) + 16;
      if (next > cap) {
        next = cap;
        el.style.overflowY = "auto";
      } else {
        el.style.overflowY = "hidden";
      }
    }
    el.style.height = next + "px";
  }
  function handleInput(event: any) {
    onInput?.(event);
    onValueChange?.(event.target.value);
    resize();
  }
  $: classes = () => {
    return cn(
      textareaVariants({
        size: size,
      }),
      autoResize ? "resize-none overflow-hidden" : "",
      className
    );
  };

  let textareaRef;

  onMount(() => {
    resize();
  });

  function onUpdateFn_0(..._args: any[]) {
    resize();
  }

  $: onUpdateFn_0(...[value]);
</script>

<textarea
  bind:this={textareaRef}
  {placeholder}
  {value}
  {defaultValue}
  {disabled}
  readOnly={readOnly || readonly}
  {required}
  rows={rows || 3}
  {maxLength}
  {minLength}
  {name}
  {id}
  {form}
  {autoFocus}
  {spellcheck}
  aria-label={"aria-label"}
  aria-labelledby={"aria-labelledby"}
  aria-describedby={"aria-describedby"}
  aria-invalid={invalid || "aria-invalid" ? true : undefined}
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