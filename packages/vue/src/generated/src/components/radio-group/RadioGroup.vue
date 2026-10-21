<template>
  <div
    role="radiogroup"
    ref="groupRef"
    :id="id"
    :aria-label="'aria-label'"
    :aria-labelledby="'aria-labelledby'"
    :aria-describedby="'aria-describedby'"
    :aria-orientation="orientation || 'vertical'"
    :aria-required="required ? true : undefined"
    :aria-disabled="disabled ? true : undefined"
    :data-orientation="orientation || 'vertical'"
    :data-disabled="disabled ? '' : undefined"
    @keydown="async (event) => handleKeyDown(event)"
    @click="async (event) => handleClick(event)"
    :class="classes"
  >
    <slot />
    <template v-if="name">
      <input type="hidden" :name="name" :value="value || ''" :form="form" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { radioGroupVariants } from "./radio-group.styles.ts";
import { rovingFocus, syncTabStops } from "../_internal/dom.ts";

export interface RadioGroupProps {
  /** The value of the currently selected item */
  value?: string;
  /** Submits the selected value under this name */
  name?: string;
  form?: string;
  /** Disables the whole group */
  disabled?: boolean;
  /** Marks the group as required for form validation */
  required?: boolean;
  /** Layout direction — also drives arrow-key navigation */
  orientation?: "horizontal" | "vertical";
  /** Wrap arrow-key navigation from last to first item (default true) */
  loop?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /**
   * Fires with the value of the item the user picked (click, Space, or arrow
   * keys). Lets the group own selection instead of wiring every item’s onSelect.
   */
  onValueChange?: (value: string) => void;
  children?: any;
}

export default defineComponent({
  name: "radio-group",

  props: [
    "value",
    "orientation",
    "className",
    "disabled",
    "loop",
    "onValueChange",
    "id",
    "required",
    "name",
    "form",
  ],

  mounted() {
    this.syncTabs();
  },

  watch: {
    onUpdateHook0: {
      handler() {
        /* Wait for items to re-render their aria-checked before picking the tab stop. */
        setTimeout(() => this.syncTabs());
      },
      immediate: true,
    },
  },

  computed: {
    classes() {
      return cn(
        radioGroupVariants({
          orientation: this.orientation,
        }),
        this.className
      );
    },
    onUpdateHook0() {
      return {
        0: this.value,
      };
    },
  },

  methods: {
    syncTabs() {
      syncTabStops(
        this.$refs.groupRef,
        '[role="radio"]',
        '[aria-checked="true"]'
      );
    },
    handleKeyDown(event: any) {
      if (this.disabled) return;
      rovingFocus(event, this.$refs.groupRef, '[role="radio"]', {
        orientation: "both",
        loop: this.loop !== false,
        activate: true,
      });
    },
    handleClick(event: any) {
      if (this.disabled) return;
      const item = event.target.closest
        ? event.target.closest('[role="radio"]')
        : null;
      if (
        !item ||
        item.disabled ||
        !this.$refs.groupRef ||
        !this.$refs.groupRef.contains(item)
      )
        return;
      this.onValueChange?.(item.getAttribute("value") || "");
    },
  },
});
</script>