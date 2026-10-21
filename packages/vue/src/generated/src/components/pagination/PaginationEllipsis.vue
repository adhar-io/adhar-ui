<template>
  <span :class="classes"
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
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="19" cy="12" r="1"></circle>
      <circle cx="5" cy="12" r="1"></circle></svg
    ><span class="sr-only">{{ label || "More pages" }}</span></span
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { paginationEllipsisVariants } from "./pagination.styles.ts";

export interface PaginationEllipsisProps {
  className?: string;
  /** Screen-reader label (default "More pages") */
  label?: string;
}

export default defineComponent({
  name: "pagination-ellipsis",

  props: ["className", "label"],

  computed: {
    classes() {
      return cn(paginationEllipsisVariants(), this.className);
    },
  },
});
</script>