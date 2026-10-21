<template>
  <div
    role="menuitem"
    :tabIndex="-1"
    :aria-disabled="disabled ? true : undefined"
    :data-disabled="disabled ? '' : undefined"
    @click="async (event) => activate()"
    @keydown="async (event) => handleKeyDown(event)"
    :class="classes"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { dropdownMenuItemVariants } from "./dropdown-menu.styles.ts";

export interface DropdownMenuItemProps {
  disabled?: boolean;
  /** "destructive" for delete-style actions */
  variant?: "default" | "destructive";
  /** Indent to line up with items that have a leading icon */
  inset?: boolean;
  className?: string;
  onClick?: () => void;
  /** Alias of `onClick` */
  onSelect?: () => void;
  children?: any;
}

export default defineComponent({
  name: "dropdown-menu-item",

  props: ["variant", "inset", "className", "disabled", "onClick", "onSelect"],

  computed: {
    classes() {
      return cn(
        dropdownMenuItemVariants({
          variant: this.variant,
          inset: !!this.inset,
        }),
        this.className
      );
    },
  },

  methods: {
    activate() {
      if (this.disabled) return;
      this.onClick?.();
      this.onSelect?.();
    },
    handleKeyDown(event: any) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        /* Route through click so DropdownMenu sees it and closes. */
        if (!this.disabled) event.currentTarget.click();
      }
    },
  },
});
</script>