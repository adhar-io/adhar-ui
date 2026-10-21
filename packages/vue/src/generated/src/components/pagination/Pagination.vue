<template>
  <nav :aria-label="'aria-label' || 'Pagination'" :class="classes">
    <slot />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { paginationVariants } from "./pagination.styles.ts";

export interface PaginationProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "pagination",

  props: ["className"],

  computed: {
    classes() {
      return cn(paginationVariants(), this.className);
    },
  },
});
</script>