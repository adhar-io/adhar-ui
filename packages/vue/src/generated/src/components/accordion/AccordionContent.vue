<template>
  <div
    role="region"
    :id="id"
    :aria-labelledby="'aria-labelledby'"
    :data-state="open ? 'open' : 'closed'"
    :hidden="!open"
    :class="classes"
  >
    <div :class="innerClasses"><slot /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { accordionContentVariants } from "./accordion.styles.ts";

export interface AccordionContentProps {
  open?: boolean;
  className?: string;
  /** Class for the inner padding wrapper */
  innerClass?: string;
  /** Give the region an id and pass it to AccordionTrigger `aria-controls` */
  id?: string;
  /** ID of the AccordionTrigger that labels this region */
  "aria-labelledby"?: string;
  children?: any;
}

export default defineComponent({
  name: "accordion-content",

  props: ["className", "innerClass", "id", "open"],

  computed: {
    classes() {
      return cn(accordionContentVariants(), this.className);
    },
    innerClasses() {
      return cn("pb-4 pt-0", this.innerClass);
    },
  },
});
</script>