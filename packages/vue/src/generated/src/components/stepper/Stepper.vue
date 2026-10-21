<template>
  <ol
    :aria-label="'aria-label' || 'Progress'"
    :data-orientation="orientation || 'horizontal'"
    :class="classes"
  >
    <slot />
  </ol>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { stepperVariants } from "./stepper.styles.ts";

export interface StepperProps {
  /** Pass the same orientation to each Step */
  orientation?: "horizontal" | "vertical";
  className?: string;
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "stepper",

  props: ["orientation", "className"],

  computed: {
    classes() {
      return cn(
        stepperVariants({
          orientation: this.orientation,
        }),
        this.className
      );
    },
  },
});
</script>