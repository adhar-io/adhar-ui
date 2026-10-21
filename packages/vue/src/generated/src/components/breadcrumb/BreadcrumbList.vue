<template>
  <ol :id="id" :class="classes">
    <slot />
  </ol>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { breadcrumbListVariants } from "./breadcrumb.styles.ts";

export interface BreadcrumbListProps {
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "breadcrumb-list",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(breadcrumbListVariants(), this.className);
    },
  },
});
</script>