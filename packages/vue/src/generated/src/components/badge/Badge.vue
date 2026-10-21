<template>
  <span
    :id="id"
    :title="title"
    :role="role || (onClick ? 'button' : undefined)"
    :tabIndex="onClick ? 0 : undefined"
    :aria-label="'aria-label'"
    @click="async (event) => onClick?.(event)"
    @keydown="async (event) => handleKeyDown(event)"
    :class="classes"
  >
    <template v-if="dot">
      <span aria-hidden="true" :class="dotClasses"></span>
    </template>

    <slot
  /></span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { badgeVariants } from "./badge.styles.ts";

export interface BadgeProps {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "info";
  size?: "sm" | "default" | "lg";
  className?: string;
  id?: string;
  title?: string;
  /** Renders a small leading status dot inheriting the badge’s text color */
  dot?: boolean;
  /** Extra classes for the leading dot (e.g. a fixed color) */
  dotClass?: string;
  /**
   * ARIA role. Only set "status" for live, dynamic counters (e.g. unread
   * counts) so screen readers announce changes. Static labels need no role.
   * Defaults to "button" when `onClick` is set.
   */
  role?: string;
  "aria-label"?: string;
  /** Makes the badge interactive: focusable, and activated by Enter / Space */
  onClick?: (event: any) => void;
  children?: any;
}

export default defineComponent({
  name: "badge",

  props: [
    "variant",
    "size",
    "onClick",
    "className",
    "dotClass",
    "id",
    "title",
    "role",
    "dot",
  ],

  computed: {
    classes() {
      return cn(
        badgeVariants({
          variant: this.variant,
          size: this.size,
        }),
        this.onClick ? "cursor-pointer" : "",
        this.className
      );
    },
    dotClasses() {
      return cn(
        "mr-1 inline-block size-1.5 shrink-0 rounded-full bg-current opacity-70",
        this.dotClass
      );
    },
  },

  methods: {
    handleKeyDown(event: any) {
      if (this.onClick && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        this.onClick(event);
      }
    },
  },
});
</script>