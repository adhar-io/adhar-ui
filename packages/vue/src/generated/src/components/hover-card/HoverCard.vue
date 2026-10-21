<template>
  <div :class="classes"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { hoverCardVariants } from "./hover-card.styles.ts";

export interface HoverCardProps {
  className?: string;
  children?: any;
}

// CSS-only: HoverCardContent is shown while the pointer is over, or keyboard
// focus is inside, this wrapper. Escape is not needed since moving away hides it.

export default defineComponent({
  name: "hover-card",

  props: ["className"],

  computed: {
    classes() {
      return cn(hoverCardVariants(), this.className);
    },
  },
});
</script>