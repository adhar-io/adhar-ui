<template>
  <div :id="id" :role="roleValue" :class="classes">
    <template v-if="icon">
      {{ icon }}
    </template>

    <div><slot /></div>
    <template v-if="onDismiss">
      <button
        type="button"
        class="absolute right-2 top-2 rounded-md p-1.5 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        :aria-label="dismissLabel || 'Dismiss'"
        @click="async (event) => onDismiss?.()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { alertVariants } from "./alert.styles.ts";

export interface AlertProps {
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  /**
   * ARIA role. Defaults to "alert" (assertive) for destructive / warning and
   * "status" (polite) otherwise. Use "none" for static, non-urgent notes.
   */
  role?: string;
  /** Leading icon; positioned automatically by the alert styles */
  icon?: any;
  /** Shows a close button that calls this handler */
  onDismiss?: () => void;
  /** Accessible label for the close button (default "Dismiss") */
  dismissLabel?: string;
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "alert",

  props: [
    "variant",
    "onDismiss",
    "className",
    "role",
    "id",
    "icon",
    "dismissLabel",
  ],

  computed: {
    classes() {
      return cn(
        alertVariants({
          variant: this.variant,
        }),
        this.onDismiss ? "pr-10" : "",
        this.className
      );
    },
    roleValue() {
      if (this.role) return this.role;
      return this.variant === "destructive" || this.variant === "warning"
        ? "alert"
        : "status";
    },
  },
});
</script>