<template>
  <div
    :id="id"
    :role="'aria-labelledby' ? 'region' : undefined"
    :aria-labelledby="'aria-labelledby'"
    :data-state="open ? 'open' : 'closed'"
    :class="classes"
  >
    <div :class="innerClasses"><slot /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import {
  collapsibleContentInnerVariants,
  collapsibleContentVariants,
} from "./collapsible.styles.ts";

export interface CollapsibleContentProps {
  open?: boolean;
  id?: string;
  className?: string;
  /** Class for the required inner overflow-hidden wrapper */
  innerClass?: string;
  /** ID of the trigger, to expose the content as a labelled region */
  "aria-labelledby"?: string;
  children?: any;
}

// Animates height with the grid-rows 0fr → 1fr technique; closed content is
// `invisible`, so it is skipped by Tab and screen readers but stays mounted.

export default defineComponent({
  name: "collapsible-content",

  props: ["open", "className", "innerClass", "id"],

  computed: {
    classes() {
      return cn(
        collapsibleContentVariants({
          open: !!this.open,
        }),
        this.className
      );
    },
    innerClasses() {
      return cn(collapsibleContentInnerVariants(), this.innerClass);
    },
  },
});
</script>