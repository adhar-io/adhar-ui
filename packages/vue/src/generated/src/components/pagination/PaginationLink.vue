<template>
  <a
    :href="disabled ? undefined : href"
    :role="href && !disabled ? undefined : 'link'"
    :tabIndex="disabled ? -1 : href ? undefined : 0"
    :aria-current="isActive ? 'page' : undefined"
    :aria-disabled="disabled ? true : undefined"
    :aria-label="'aria-label'"
    @click="async (event) => handleClick(event)"
    @keydown="
      async (event) => {
        if (!href && event.key === 'Enter') handleClick(event);
      }
    "
    :class="classes"
    ><slot
  /></a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { paginationLinkVariants } from "./pagination.styles.ts";

export interface PaginationLinkProps {
  href?: string;
  /** Marks this link as the current page (sets aria-current="page") */
  isActive?: boolean;
  /** Removes the link from navigation and the tab order */
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  className?: string;
  "aria-label"?: string;
  /** Use for client-side paging; not called while disabled */
  onClick?: (event: any) => void;
  children?: any;
}

export default defineComponent({
  name: "pagination-link",

  props: ["isActive", "size", "className", "disabled", "onClick", "href"],

  computed: {
    classes() {
      return cn(
        paginationLinkVariants({
          isActive: !!this.isActive,
          size: this.size,
        }),
        this.className
      );
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