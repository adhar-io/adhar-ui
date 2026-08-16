// @ts-nocheck
<template>
  <div
    role="menuitem"
    :tabIndex="props.disabled ? -1 : 0"
    :aria-disabled="props.disabled"
    @click="
      async (event) => {
        if (!props.disabled) {
          props.onClick?.();
        }
      }
    "
    @keydown="
      async (event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !props.disabled) {
          event.preventDefault();
          props.onClick?.();
        }
      }
    "
    :class="props.className"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export interface DropdownMenuItemProps {
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children?: any;
}

export default defineComponent({
  name: "dropdown-menu-item",

  props: ["disabled", "onClick", "className"],
});
</script>