<template>
  <div
    :data-value="value"
    :data-state="open ? 'open' : 'closed'"
    :data-disabled="disabled ? '' : undefined"
    :class="classes"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { accordionItemVariants } from "./accordion.styles.ts";

export interface AccordionItemProps {
  value: string;
  /** Exposes data-state="open" for styling */
  open?: boolean;
  disabled?: boolean;
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "accordion-item",

  props: ["className", "value", "open", "disabled"],

  computed: {
    classes() {
      return cn(accordionItemVariants(), this.className);
    },
  },
});
</script>