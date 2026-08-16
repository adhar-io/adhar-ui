// @ts-nocheck
<script context="module" lang="ts">
  export interface ButtonProps {
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
    size?:
      | "xs"
      | "sm"
      | "default"
      | "lg"
      | "xl"
      | "icon"
      | "icon-sm"
      | "icon-lg";
    /** Whether the button is disabled */
    disabled?: boolean;
    /** Shows a spinner, sets aria-busy, and blocks interaction */
    loading?: boolean;
    /** Text announced by screen readers while loading (defaults to "Loading") */
    loadingText?: string;
    /** Stretches the button to fill its container */
    fullWidth?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
    name?: string;
    value?: string;
    form?: string;
    "aria-label"?: string;
    "aria-controls"?: string;
    "aria-expanded"?: boolean;
    "aria-pressed"?: boolean;
    "aria-haspopup"?: boolean;
    onClick?: (event: any) => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let disabled: ButtonProps["disabled"];
  export let loading: ButtonProps["loading"];
  export let type: ButtonProps["type"];
  export let name: ButtonProps["name"];
  export let value: ButtonProps["value"];
  export let form: ButtonProps["form"];
  export let onClick: ButtonProps["onClick"];
  export let className: ButtonProps["className"];
  export let loadingText: ButtonProps["loadingText"];
</script>

<button
  disabled={disabled || loading}
  type={type || "button"}
  {name}
  {value}
  {form}
  aria-disabled={disabled || loading}
  aria-busy={loading}
  aria-label={"aria-label"}
  aria-controls={"aria-controls"}
  aria-expanded={"aria-expanded"}
  aria-pressed={"aria-pressed"}
  aria-haspopup={"aria-haspopup"}
  on:click={(event) => {
    onClick?.(event);
  }}
  class={className}
>
  {#if loading}
    <span
      aria-hidden="true"
      class="inline-block size-4 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin motion-reduce:animate-none"
    />
    <span class="sr-only">{loadingText || "Loading"}</span>
  {/if}<slot /></button
>