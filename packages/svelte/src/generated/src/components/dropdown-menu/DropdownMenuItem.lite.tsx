// @ts-nocheck
<script context="module" lang="ts">
  export interface DropdownMenuItemProps {
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let disabled: DropdownMenuItemProps["disabled"];
  export let onClick: DropdownMenuItemProps["onClick"];
  export let className: DropdownMenuItemProps["className"];
</script>

<div
  role="menuitem"
  tabIndex={disabled ? -1 : 0}
  aria-disabled={disabled}
  on:click={(event) => {
    if (!disabled) {
      onClick?.();
    }
  }}
  on:keydown={(event) => {
    if ((event.key === "Enter" || event.key === " ") && !disabled) {
      event.preventDefault();
      onClick?.();
    }
  }}
  class={className}
>
  <slot />
</div>