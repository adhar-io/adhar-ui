<template>
  <button
    type="button"
    :id="id"
    :title="title"
    :value="value"
    :aria-pressed="pressed ? true : false"
    :aria-label="'aria-label'"
    :data-state="pressed ? 'on' : 'off'"
    :disabled="disabled"
    @click="async (event) => (disabled ? undefined : onToggle?.(value))"
    :class="classes"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { toggleVariants } from "../toggle/toggle.styles.ts";

export interface ToggleGroupItemProps {
  /** The value this item represents within its group */
  value: string;
  /** Whether this item is currently pressed/on */
  pressed?: boolean;
  disabled?: boolean;
  variant?: "default" | "outline";
  size?: "sm" | "default" | "lg";
  className?: string;
  id?: string;
  title?: string;
  "aria-label"?: string;
  /** Fired with this item’s value when activated */
  onToggle?: (value: string) => void;
  children?: any;
}

export default defineComponent({
  name: "toggle-group-item",

  props: [
    "variant",
    "size",
    "className",
    "id",
    "title",
    "value",
    "pressed",
    "disabled",
    "onToggle",
  ],

  computed: {
    classes() {
      return cn(
        toggleVariants({
          variant: this.variant,
          size: this.size,
        }),
        this.className
      );
    },
  },
});
</script>