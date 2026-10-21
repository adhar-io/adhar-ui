<template>
  <span aria-current="page" :class="classes"><slot /></span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { breadcrumbPageVariants } from "./breadcrumb.styles.ts";

export interface BreadcrumbPageProps {
  className?: string;
  children?: any;
}

// The current page — not a link. aria-current="page" marks it for AT.

export default defineComponent({
  name: "breadcrumb-page",

  props: ["className"],

  computed: {
    classes() {
      return cn(breadcrumbPageVariants(), this.className);
    },
  },
});
</script>