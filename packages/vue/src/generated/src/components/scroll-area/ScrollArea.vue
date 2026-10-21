<template>
  <div
    :style="{
      maxHeight: maxHeightValue,
    }"
    :tabIndex="focusable ? 0 : undefined"
    :role="focusable ? 'region' : undefined"
    :aria-label="'aria-label'"
    :data-orientation="orientation || 'vertical'"
    :class="classes"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { scrollAreaVariants } from "./scroll-area.styles.ts";

export interface ScrollAreaProps {
  orientation?: "vertical" | "horizontal" | "both";
  /** Max height of the scroll viewport, e.g. "20rem" or 320 (px) */
  maxHeight?: string | number;
  className?: string;
  /** Adds tabindex so keyboard users can scroll the region. Requires `aria-label`. */
  focusable?: boolean;
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "scroll-area",

  props: ["orientation", "focusable", "className", "maxHeight"],

  computed: {
    classes() {
      return cn(
        scrollAreaVariants({
          orientation: this.orientation,
        }),
        this.focusable
          ? "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          : "",
        this.className
      );
    },
    maxHeightValue() {
      if (this.maxHeight === undefined || this.maxHeight === null)
        return undefined;
      return typeof this.maxHeight === "number"
        ? this.maxHeight + "px"
        : this.maxHeight;
    },
  },
});
</script>