<template>
  <a
    :href="disabled ? undefined : href"
    :role="href && !disabled ? undefined : 'link'"
    :tabIndex="disabled ? -1 : href ? undefined : 0"
    :aria-label="'aria-label' || 'Go to previous page'"
    :aria-disabled="disabled ? true : undefined"
    @click="async (event) => handleClick(event)"
    @keydown="
      async (event) => {
        if (!href && event.key === 'Enter') handleClick(event);
      }
    "
    :class="classes"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6"></path></svg
    ><span :class="labelClasses">{{ label || "Previous" }}</span></a
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { paginationLinkVariants } from "./pagination.styles.ts";

export interface PaginationPreviousProps {
  href?: string;
  /** Removes the link from navigation and the tab order (e.g. on the first page) */
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  className?: string;
  /** Visible label (default "Previous") */
  label?: string;
  /** Show only the chevron; the label stays available to screen readers */
  iconOnly?: boolean;
  "aria-label"?: string;
  onClick?: (event: any) => void;
}

export default defineComponent({
  name: "pagination-previous",

  props: [
    "size",
    "iconOnly",
    "className",
    "disabled",
    "onClick",
    "href",
    "label",
  ],

  computed: {
    classes() {
      return cn(
        paginationLinkVariants({
          isActive: false,
          size: this.size,
        }),
        this.iconOnly ? "" : "gap-1 pl-2.5",
        this.className
      );
    },
    labelClasses() {
      return this.iconOnly ? "sr-only" : "hidden sm:inline";
    },
  },

  methods: {
    handleClick(event: any) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      this.onClick?.(event);
    },
  },
});
</script>