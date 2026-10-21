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
    id?: string;
    title?: string;
    name?: string;
    value?: string;
    form?: string;
    autoFocus?: boolean;
    "aria-label"?: string;
    "aria-describedby"?: string;
    "aria-controls"?: string;
    "aria-expanded"?: boolean;
    "aria-pressed"?: boolean;
    "aria-haspopup"?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
    onClick?: (event: any) => void;
    onFocus?: (event: any) => void;
    onBlur?: (event: any) => void;
    onKeyDown?: (event: any) => void;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { buttonVariants } from "./button.styles.ts";

  export let variant: ButtonProps["variant"] = undefined;
  export let size: ButtonProps["size"] = undefined;
  export let fullWidth: ButtonProps["fullWidth"] = undefined;
  export let className: ButtonProps["className"] = undefined;
  export let disabled: ButtonProps["disabled"] = undefined;
  export let loading: ButtonProps["loading"] = undefined;
  export let id: ButtonProps["id"] = undefined;
  export let title: ButtonProps["title"] = undefined;
  export let type: ButtonProps["type"] = undefined;
  export let name: ButtonProps["name"] = undefined;
  export let value: ButtonProps["value"] = undefined;
  export let form: ButtonProps["form"] = undefined;
  export let autoFocus: ButtonProps["autoFocus"] = undefined;
  export let onClick: ButtonProps["onClick"] = undefined;
  export let onFocus: ButtonProps["onFocus"] = undefined;
  export let onBlur: ButtonProps["onBlur"] = undefined;
  export let onKeyDown: ButtonProps["onKeyDown"] = undefined;
  export let loadingText: ButtonProps["loadingText"] = undefined;

  $: classes = () => {
    return cn(
      buttonVariants({
        variant: variant,
        size: size,
        fullWidth: !!fullWidth,
      }),
      className
    );
  };
  $: isIconOnly = () => {
    return !!size && size.indexOf("icon") === 0;
  };
  $: isInactive = () => {
    return !!disabled || !!loading;
  };
</script>

<button
  {id}
  {title}
  disabled={isInactive()}
  type={type || "button"}
  {name}
  {value}
  {form}
  {autoFocus}
  aria-busy={loading ? true : undefined}
  aria-label={"aria-label"}
  aria-describedby={"aria-describedby"}
  aria-controls={"aria-controls"}
  aria-expanded={"aria-expanded"}
  aria-pressed={"aria-pressed"}
  aria-haspopup={"aria-haspopup"}
  data-loading={loading ? "" : undefined}
  on:click={(event) => {
    if (!isInactive()) onClick?.(event);
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
>
  {#if loading}
    <span
      aria-hidden="true"
      class="inline-block size-4 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin motion-reduce:animate-none"
    />
    <span class="sr-only">{loadingText || "Loading"}</span>
  {/if}
  {#if !(loading && isIconOnly())}
    <slot />
  {/if}</button
>