<template>
  <h3 :class="headingClasses">
    <button
      type="button"
      data-accordion-trigger=""
      :id="id"
      :disabled="disabled"
      :aria-expanded="open ? true : false"
      :aria-controls="'aria-controls'"
      :data-state="open ? 'open' : 'closed'"
      :data-value="value"
      @click="async (event) => onClick?.()"
      :class="classes"
    >
      <slot /><svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        class="shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none"
      >
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    </button>
  </h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { accordionTriggerVariants } from "./accordion.styles.ts";

export interface AccordionTriggerProps {
  open?: boolean;
  /** The owning item’s value — lets Accordion’s onValueChange handle the click */
  value?: string;
  disabled?: boolean;
  className?: string;
  /** Class for the heading element wrapping the trigger */
  headingClass?: string;
  /** Give the trigger an id and pass it to AccordionContent `aria-labelledby` */
  id?: string;
  /** ID of the AccordionContent region this trigger toggles */
  "aria-controls"?: string;
  onClick?: () => void;
  children?: any;
}

// Wrapped in a heading per the WAI-ARIA accordion pattern, so screen-reader
// users can jump between sections with heading navigation.

export default defineComponent({
  name: "accordion-trigger",

  props: [
    "className",
    "headingClass",
    "id",
    "disabled",
    "open",
    "value",
    "onClick",
  ],

  computed: {
    classes() {
      return cn(
        accordionTriggerVariants(),
        "w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm disabled:cursor-not-allowed disabled:opacity-50",
        this.className
      );
    },
    headingClasses() {
      return cn("flex", this.headingClass);
    },
  },
});
</script>