<template>
  <ul :id="id" :class="classes">
    <slot />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { paginationContentVariants } from "./pagination.styles.ts";

export interface PaginationContentProps {
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "pagination-content",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(paginationContentVariants(), this.className);
    },
  },
});
</script>