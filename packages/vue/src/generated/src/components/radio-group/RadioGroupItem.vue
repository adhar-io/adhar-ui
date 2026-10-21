<template>
  <button
    type="button"
    role="radio"
    :id="id"
    :value="value"
    :tabIndex="checked ? 0 : -1"
    :aria-checked="checked ? true : false"
    :aria-label="'aria-label'"
    :aria-labelledby="'aria-labelledby'"
    :aria-describedby="'aria-describedby'"
    :data-state="checked ? 'checked' : 'unchecked'"
    :disabled="disabled"
    @click="async (event) => (disabled ? undefined : onSelect?.(value))"
    :class="classes"
  >
    <template v-if="checked">
      <span aria-hidden="true" :class="indicatorClasses"></span>
    </template>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import {
  radioGroupIndicatorVariants,
  radioGroupItemVariants,
} from "./radio-group.styles.ts";

export interface RadioGroupItemProps {
  /** The value this item represents within its group */
  value: string;
  /** Whether this item is the selected one */
  checked?: boolean;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  id?: string;
  className?: string;
  /** Classes for the inner selected-state dot */
  indicatorClass?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /** Fired with this item’s value when the user selects it */
  onSelect?: (value: string) => void;
}

// Tab order is managed by RadioGroup (roving tabindex): only the checked item,
// or the first enabled one, is tabbable, and arrow keys move between items.

export default defineComponent({
  name: "radio-group-item",

  props: [
    "size",
    "className",
    "indicatorClass",
    "id",
    "value",
    "checked",
    "disabled",
    "onSelect",
  ],

  computed: {
    classes() {
      return cn(
        radioGroupItemVariants({
          size: this.size,
        }),
        this.className
      );
    },
    indicatorClasses() {
      return cn(
        radioGroupIndicatorVariants({
          size: this.size,
        }),
        this.indicatorClass
      );
    },
  },
});
</script>