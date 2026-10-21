<template>
  <li role="presentation" aria-hidden="true" :class="classes">
    <template v-if="$slots.default">
      <slot />
    </template>

    <template v-else>
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
      >
        <path d="m9 18 6-6-6-6"></path>
      </svg>
    </template>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { breadcrumbSeparatorVariants } from "./breadcrumb.styles.ts";

export interface BreadcrumbSeparatorProps {
  className?: string;
  /** Custom separator content; defaults to a chevron */
  children?: any;
}

export default defineComponent({
  name: "breadcrumb-separator",

  props: ["className"],

  computed: {
    classes() {
      return cn(breadcrumbSeparatorVariants(), this.className);
    },
  },
});
</script>