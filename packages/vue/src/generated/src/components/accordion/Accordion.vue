<template>
  <div
    ref="rootRef"
    :id="id"
    :data-type="type || 'single'"
    @keydown="async (event) => handleKeyDown(event)"
    @click="async (event) => handleClick(event)"
    :class="className"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { rovingFocus } from "../_internal/dom.ts";

export interface AccordionProps {
  /** ’single’ keeps at most one item open; ’multiple’ allows many */
  type?: "single" | "multiple";
  /**
   * Open item(s): a string for type="single" (’’ when all closed), an array
   * for type="multiple". Used to compute `onValueChange`.
   */
  value?: string | string[];
  /** type="single": allow closing the open item by clicking it again (default true) */
  collapsible?: boolean;
  className?: string;
  id?: string;
  /**
   * Fires with the next value when a trigger that has a `value` is clicked.
   * Lets the root own open state instead of wiring every trigger’s onClick.
   */
  onValueChange?: (value: any) => void;
  children?: any;
}

export default defineComponent({
  name: "accordion",

  props: ["onValueChange", "type", "value", "collapsible", "id", "className"],

  methods: {
    handleKeyDown(event: any) {
      if (
        !event.target.hasAttribute ||
        !event.target.hasAttribute("data-accordion-trigger")
      ) {
        return;
      }
      rovingFocus(event, this.$refs.rootRef, "[data-accordion-trigger]", {
        orientation: "vertical",
      });
    },
    handleClick(event: any) {
      if (!this.onValueChange) return;
      const trigger = event.target.closest
        ? event.target.closest("[data-accordion-trigger]")
        : null;
      if (
        !trigger ||
        trigger.disabled ||
        !this.$refs.rootRef ||
        !this.$refs.rootRef.contains(trigger)
      )
        return;
      const itemValue = trigger.getAttribute("data-value");
      if (!itemValue) return;
      if (this.type === "multiple") {
        const current: string[] = Array.isArray(this.value) ? this.value : [];
        this.onValueChange(
          current.indexOf(itemValue) >= 0
            ? current.filter((v) => v !== itemValue)
            : current.concat([itemValue])
        );
      } else if (this.value === itemValue) {
        if (this.collapsible !== false) this.onValueChange("");
      } else {
        this.onValueChange(itemValue);
      }
    },
  },
});
</script>