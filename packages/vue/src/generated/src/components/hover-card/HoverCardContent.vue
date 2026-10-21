<template>
  <div role="tooltip" :id="id" :data-side="side || 'bottom'" :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { hoverCardContentVariants } from "./hover-card.styles.ts";

export interface HoverCardContentProps {
  side?: "top" | "bottom" | "left" | "right";
  id?: string;
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "hover-card-content",

  props: ["side", "className", "id"],

  computed: {
    classes() {
      return cn(
        hoverCardContentVariants({
          side: this.side,
        }),
        this.className
      );
    },
  },
});
</script>