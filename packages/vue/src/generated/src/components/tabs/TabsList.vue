<template>
  <div
    role="tablist"
    ref="listRef"
    :aria-orientation="orientation || 'horizontal'"
    :aria-label="'aria-label'"
    :aria-labelledby="'aria-labelledby'"
    @keydown="async (event) => handleKeyDown(event)"
    :class="classes"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { tabsListVariants } from "./tabs.styles.ts";
import { rovingFocus } from "../_internal/dom.ts";

export interface TabsListProps {
  orientation?: "horizontal" | "vertical";
  /** Stretch the list and its triggers to the container width */
  fullWidth?: boolean;
  /**
   * ’automatic’ (default) selects a tab as soon as arrow keys focus it;
   * ’manual’ only moves focus — Enter / Space selects.
   */
  activationMode?: "automatic" | "manual";
  /** Wrap arrow-key navigation from last to first tab (default true) */
  loop?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children?: any;
}

export default defineComponent({
  name: "tabs-list",

  props: ["orientation", "fullWidth", "className", "loop", "activationMode"],

  computed: {
    classes() {
      return cn(
        tabsListVariants({
          orientation: this.orientation,
          fullWidth: !!this.fullWidth,
        }),
        this.className
      );
    },
  },

  methods: {
    handleKeyDown(event: any) {
      rovingFocus(event, this.$refs.listRef, '[role="tab"]', {
        orientation:
          this.orientation === "vertical" ? "vertical" : "horizontal",
        loop: this.loop !== false,
        activate: this.activationMode !== "manual",
      });
    },
  },
});
</script>