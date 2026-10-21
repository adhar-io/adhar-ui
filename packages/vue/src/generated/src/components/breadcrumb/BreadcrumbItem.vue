<template>
  <li :id="id" :class="classes"><slot /></li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { breadcrumbItemVariants } from "./breadcrumb.styles.ts";

export interface BreadcrumbItemProps {
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "breadcrumb-item",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(breadcrumbItemVariants(), this.className);
    },
  },
});
</script>