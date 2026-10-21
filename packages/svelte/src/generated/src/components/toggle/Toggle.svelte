<script context="module" lang="ts">
  export interface ToggleProps {
    /** Whether the toggle is currently pressed/on (controlled) */
    pressed?: boolean;
    /** Initial pressed state when uncontrolled */
    defaultPressed?: boolean;
    disabled?: boolean;
    variant?: "default" | "outline";
    size?: "sm" | "default" | "lg";
    className?: string;
    id?: string;
    title?: string;
    "aria-label"?: string;
    /** Fired with the next pressed state when activated */
    onPressedChange?: (pressed: boolean) => void;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { toggleVariants } from "./toggle.styles.ts";

  export let defaultPressed: ToggleProps["defaultPressed"] = undefined;
  export let pressed: ToggleProps["pressed"] = undefined;
  export let variant: ToggleProps["variant"] = undefined;
  export let size: ToggleProps["size"] = undefined;
  export let className: ToggleProps["className"] = undefined;
  export let disabled: ToggleProps["disabled"] = undefined;
  export let onPressedChange: ToggleProps["onPressedChange"] = undefined;
  export let id: ToggleProps["id"] = undefined;
  export let title: ToggleProps["title"] = undefined;

  function handleClick() {
    if (disabled) return;
    const next = !isPressed();
    internalPressed = next;
    onPressedChange?.(next);
  }
  $: isPressed = () => {
    return pressed !== undefined ? !!pressed : internalPressed;
  };
  $: classes = () => {
    return cn(
      toggleVariants({
        variant: variant,
        size: size,
      }),
      className
    );
  };

  let internalPressed = false;
  internalPressed = !!defaultPressed;
</script>

<button
  type="button"
  {id}
  {title}
  aria-pressed={isPressed()}
  aria-label={"aria-label"}
  data-state={isPressed() ? "on" : "off"}
  {disabled}
  on:click={(event) => {
    handleClick();
  }}
  class={classes()}><slot /></button
>