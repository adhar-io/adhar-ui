<template>
  <input
    type="range"
    :min="min === undefined ? 0 : min"
    :max="max === undefined ? 100 : max"
    :step="step || 1"
    :value="value"
    :defaultValue="defaultValue"
    :disabled="disabled"
    :name="name"
    :id="id"
    :form="form"
    :list="list"
    :aria-label="'aria-label'"
    :aria-labelledby="'aria-labelledby'"
    :aria-describedby="'aria-describedby'"
    :aria-valuetext="'aria-valuetext'"
    :aria-orientation="orientation || 'horizontal'"
    @input="async (event) => handleInput(event)"
    @change="async (event) => onChange?.(Number(event.target.value))"
    :class="classes"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { sliderVariants } from "./slider.styles.ts";

export interface SliderProps {
  /** Current value (controlled) */
  value?: number;
  /** Initial value when uncontrolled */
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: "sm" | "default" | "lg";
  name?: string;
  id?: string;
  form?: string;
  /** ID of a <datalist> with tick marks */
  list?: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /** Human-readable value for screen readers (e.g. "$40", "Medium") */
  "aria-valuetext"?: string;
  /** Fires continuously while dragging */
  onInput?: (value: number) => void;
  /** Alias of `onInput` */
  onValueChange?: (value: number) => void;
  /** Fires when the value is committed (drag end / keyboard) */
  onChange?: (value: number) => void;
}

export default defineComponent({
  name: "slider",

  props: [
    "size",
    "orientation",
    "className",
    "onInput",
    "onValueChange",
    "min",
    "max",
    "step",
    "value",
    "defaultValue",
    "disabled",
    "name",
    "id",
    "form",
    "list",
    "onChange",
  ],

  computed: {
    classes() {
      return cn(
        sliderVariants({
          size: this.size,
        }),
        this.orientation === "vertical"
          ? "[writing-mode:vertical-lr] [direction:rtl] h-auto w-5"
          : "",
        this.className
      );
    },
  },

  methods: {
    handleInput(event: any) {
      const next = Number(event.target.value);
      this.onInput?.(next);
      this.onValueChange?.(next);
    },
  },
});
</script>