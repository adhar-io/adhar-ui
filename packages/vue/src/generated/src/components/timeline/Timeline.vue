<template>
  <ol :id="id" :aria-label="'aria-label' || 'Timeline'" :class="classes">
    <slot />
  </ol>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { timelineVariants } from "./timeline.styles.ts";

export interface TimelineProps {
  className?: string;
  id?: string;
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "timeline",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(timelineVariants(), this.className);
    },
  },
});
</script>