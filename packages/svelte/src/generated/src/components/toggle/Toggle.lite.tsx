// @ts-nocheck
<script context="module" lang="ts">
  export interface ToggleProps {
    /** Whether the toggle is currently pressed/on (controlled) */
    pressed?: boolean;
    disabled?: boolean;
    className?: string;
    id?: string;
    "aria-label"?: string;
    /** Fired with the next pressed state when activated */
    onPressedChange?: (pressed: boolean) => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let id: ToggleProps["id"];
  export let pressed: ToggleProps["pressed"];
  export let disabled: ToggleProps["disabled"];
  export let onPressedChange: ToggleProps["onPressedChange"];
  export let className: ToggleProps["className"];
</script>

<button
  type="button"
  {id}
  aria-pressed={pressed ? true : false}
  aria-label={"aria-label"}
  data-state={pressed ? "on" : "off"}
  {disabled}
  on:click={(event) => {
    disabled ? undefined : onPressedChange?.(!pressed);
  }}
  class={className}><slot /></button
>