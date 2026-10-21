<template>
  <div
    role="group"
    ref="groupRef"
    :aria-label="'aria-label'"
    :aria-labelledby="'aria-labelledby'"
    :aria-disabled="disabled ? true : undefined"
    :data-type="type || 'single'"
    :data-orientation="orientation || 'horizontal'"
    @keydown="async (event) => handleKeyDown(event)"
    @click="async (event) => handleClick(event)"
    :class="classes"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { toggleGroupVariants } from "./toggle-group.styles.ts";
import { rovingFocus } from "../_internal/dom.ts";

export interface ToggleGroupProps {
  /** ’single’ allows one active item, ’multiple’ allows many */
  type?: "single" | "multiple";
  /**
   * Current value — a string for type="single" (’’ when nothing is pressed),
   * an array of strings for type="multiple". Used to compute `onValueChange`.
   */
  value?: string | string[];
  orientation?: "horizontal" | "vertical";
  /** Segmented-control look: items share borders with no gaps */
  attached?: boolean;
  /** Wrap arrow-key navigation from last to first item (default true) */
  loop?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /**
   * Fires with the next value when an item is activated: the item’s value or
   * ’’ (single), or the toggled array (multiple).
   */
  onValueChange?: (value: any) => void;
  children?: any;
}

export default defineComponent({
  name: "toggle-group",

  props: [
    "orientation",
    "attached",
    "className",
    "loop",
    "disabled",
    "onValueChange",
    "type",
    "value",
  ],

  computed: {
    classes() {
      return cn(
        toggleGroupVariants({
          orientation: this.orientation,
          attached: !!this.attached,
        }),
        this.className
      );
    },
  },

  methods: {
    handleKeyDown(event: any) {
      rovingFocus(event, this.$refs.groupRef, "button", {
        orientation:
          this.orientation === "vertical" ? "vertical" : "horizontal",
        loop: this.loop !== false,
      });
    },
    handleClick(event: any) {
      if (this.disabled || !this.onValueChange) return;
      const item = event.target.closest
        ? event.target.closest("button[value]")
        : null;
      if (
        !item ||
        item.disabled ||
        !this.$refs.groupRef ||
        !this.$refs.groupRef.contains(item)
      )
        return;
      const itemValue: string = item.getAttribute("value") || "";
      if (this.type === "multiple") {
        const current: string[] = Array.isArray(this.value) ? this.value : [];
        const next =
          current.indexOf(itemValue) >= 0
            ? current.filter((v) => v !== itemValue)
            : current.concat([itemValue]);
        this.onValueChange(next);
      } else {
        this.onValueChange(this.value === itemValue ? "" : itemValue);
      }
    },
  },
});
</script>