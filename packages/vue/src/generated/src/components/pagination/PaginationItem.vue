<template>
  <li :id="id" :class="classes"><slot /></li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { paginationItemVariants } from "./pagination.styles.ts";

export interface PaginationItemProps {
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "pagination-item",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(paginationItemVariants(), this.className);
    },
  },
});
</script>