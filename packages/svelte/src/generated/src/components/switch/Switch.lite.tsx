// @ts-nocheck
<script context="module" lang="ts">
  export interface SwitchProps {
    checked?: boolean;
    disabled?: boolean;
    name?: string;
    id?: string;
    className?: string;
    thumbClass?: string;
    "aria-label"?: string;
    onChange?: (checked: boolean) => void;
  }
</script>

<script lang="ts">
  export let id: SwitchProps["id"];
  export let disabled: SwitchProps["disabled"];
  export let className: SwitchProps["className"];
  export let thumbClass: SwitchProps["thumbClass"];
</script>

<button
  type="button"
  role="switch"
  {id}
  aria-checked={state.isChecked}
  aria-label={"aria-label"}
  {disabled}
  on:click={(event) => {
    state.handleClick();
  }}
  on:keydown={(event) => {
    state.handleKeyDown(event);
  }}
  class={className}><span class={thumbClass} /></button
>