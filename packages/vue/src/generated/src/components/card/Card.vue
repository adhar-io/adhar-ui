<template>
  <div
    :id="id"
    :role="role || (onClick ? 'button' : undefined)"
    :tabIndex="onClick ? 0 : undefined"
    :aria-label="'aria-label'"
    :aria-labelledby="'aria-labelledby'"
    @click="async (event) => onClick?.(event)"
    @keydown="async (event) => handleKeyDown(event)"
    :class="classes"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { cardVariants } from "./card.styles.ts";

export interface CardProps {
  /** Inner padding. Use ’none’ (default) with CardHeader / CardContent / CardFooter. */
  padding?: "none" | "sm" | "default" | "lg";
  /**
   * Hover / focus affordance for clickable cards. With `onClick` the card is
   * also focusable and activated by Enter / Space.
   */
  interactive?: boolean;
  className?: string;
  id?: string;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  onClick?: (event: any) => void;
  children?: any;
}

export default defineComponent({
  name: "card",

  props: ["interactive", "onClick", "padding", "className", "id", "role"],

  computed: {
    isInteractive() {
      return !!this.interactive || !!this.onClick;
    },
    classes() {
      return cn(
        cardVariants({
          padding: this.padding,
          interactive: this.isInteractive,
        }),
        this.className
      );
    },
  },

  methods: {
    handleKeyDown(event: any) {
      if (
        this.onClick &&
        event.target === event.currentTarget &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        this.onClick(event);
      }
    },
  },
});
</script>