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
    size?: "sm" | "default" | "lg" | "icon";
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
    onClick?: (event: any) => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let disabled: ButtonProps["disabled"];
  export let type: ButtonProps["type"];
  export let onClick: ButtonProps["onClick"];
  export let className: ButtonProps["className"];
</script>

<button
  {disabled}
  type={type || "button"}
  aria-disabled={disabled}
  on:click={(event) => {
    onClick?.(event);
  }}
  class={className}><slot /></button
>