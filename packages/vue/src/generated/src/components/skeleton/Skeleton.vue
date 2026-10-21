<template>
  <div aria-hidden="true" :class="classes"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { skeletonVariants } from "./skeleton.styles.ts";

export interface SkeletonProps {
  /** Preset shape: text line, heading, avatar circle, button, card, or image */
  variant?:
    | "default"
    | "text"
    | "heading"
    | "avatar"
    | "button"
    | "card"
    | "image";
  className?: string;
}

export default defineComponent({
  name: "skeleton",

  props: ["variant", "className"],

  computed: {
    classes() {
      return cn(
        skeletonVariants({
          variant: this.variant,
        }),
        "motion-reduce:animate-none",
        this.className
      );
    },
  },
});
</script>