<template>
  <div
    :style="{
      aspectRatio: ratioValue,
    }"
    :class="classes"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { aspectRatioVariants } from "./aspect-ratio.styles.ts";

export interface AspectRatioProps {
  /** Width / height. A number (16 / 9) or a CSS value ("16 / 9"). Default 16 / 9. */
  ratio?: number | string;
  className?: string;
  children?: any;
}

// Constrains its child to a fixed aspect ratio using the native CSS property.

export default defineComponent({
  name: "aspect-ratio",

  props: ["className", "ratio"],

  computed: {
    classes() {
      return cn(aspectRatioVariants(), this.className);
    },
    ratioValue() {
      return this.ratio === undefined || this.ratio === null
        ? "16 / 9"
        : String(this.ratio);
    },
  },
});
</script>