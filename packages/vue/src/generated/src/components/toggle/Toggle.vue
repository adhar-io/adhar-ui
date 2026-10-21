<template>
  <button
    type="button"
    :id="id"
    :title="title"
    :aria-pressed="isPressed"
    :aria-label="'aria-label'"
    :data-state="isPressed ? 'on' : 'off'"
    :disabled="disabled"
    @click="async (event) => handleClick()"
    :class="classes"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { toggleVariants } from "./toggle.styles.ts";

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

export default defineComponent({
  name: "toggle",

  props: [
    "defaultPressed",
    "pressed",
    "variant",
    "size",
    "className",
    "disabled",
    "onPressedChange",
    "id",
    "title",
  ],

  data() {
    return { internalPressed: false };
  },

  created() {
    this.internalPressed = !!this.defaultPressed;
  },

  computed: {
    isPressed() {
      return this.pressed !== undefined ? !!this.pressed : this.internalPressed;
    },
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

  methods: {
    handleClick() {
      if (this.disabled) return;
      const next = !this.isPressed;
      this.internalPressed = next;
      this.onPressedChange?.(next);
    },
  },
});
</script>