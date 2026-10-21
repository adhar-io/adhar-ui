<template>
  <div
    :role="isDecorative ? 'none' : 'separator'"
    :aria-orientation="isDecorative ? undefined : orientation || 'horizontal'"
    :data-orientation="orientation || 'horizontal'"
    :class="classes"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { separatorVariants } from "./separator.styles.ts";

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  /**
   * Purely visual separators (the default) are hidden from assistive tech.
   * Set false when the separator divides meaningful sections.
   */
  decorative?: boolean;
  className?: string;
}

export default defineComponent({
  name: "separator",

  props: ["orientation", "className", "decorative"],

  computed: {
    classes() {
      return cn(
        separatorVariants({
          orientation: this.orientation,
        }),
        this.className
      );
    },
    isDecorative() {
      return this.decorative !== false;
    },
  },
});
</script>