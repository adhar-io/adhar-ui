<template>
  <div
    role="progressbar"
    :aria-valuenow="isIndeterminate ? undefined : value"
    :aria-valuemin="0"
    :aria-valuemax="maxValue"
    :aria-valuetext="'aria-valuetext' || percentText"
    :aria-busy="isIndeterminate ? true : undefined"
    :aria-label="'aria-labelledby' ? undefined : 'aria-label' || 'Progress'"
    :aria-labelledby="'aria-labelledby'"
    :data-state="
      isIndeterminate
        ? 'indeterminate'
        : percent >= 100
        ? 'complete'
        : 'loading'
    "
    :class="classes"
  >
    <div
      :style="{
        transform: indicatorTransform,
      }"
      :class="indicatorClasses"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import {
  progressIndicatorVariants,
  progressVariants,
} from "./progress.styles.ts";
import { clamp } from "../_internal/dom.ts";

export interface ProgressProps {
  /** Current value. Omit (or pass null) for an indeterminate, busy bar. */
  value?: number | null;
  max?: number;
  size?: "sm" | "default" | "lg";
  className?: string;
  indicatorClass?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /** Human-readable value, e.g. "3 of 10 files" (defaults to the percentage) */
  "aria-valuetext"?: string;
}

export default defineComponent({
  name: "progress",

  props: ["value", "max", "size", "className", "indicatorClass"],

  computed: {
    isIndeterminate() {
      return this.value === undefined || this.value === null;
    },
    maxValue() {
      return this.max && this.max > 0 ? this.max : 100;
    },
    percent() {
      if (this.isIndeterminate) return 0;
      return clamp(((this.value as number) / this.maxValue) * 100, 0, 100);
    },
    classes() {
      return cn(
        progressVariants({
          size: this.size,
        }),
        this.className
      );
    },
    indicatorClasses() {
      return cn(
        progressIndicatorVariants(),
        this.isIndeterminate ? "animate-pulse motion-reduce:animate-none" : "",
        this.indicatorClass
      );
    },
    indicatorTransform() {
      return this.isIndeterminate
        ? "translateX(0)"
        : "translateX(-" + (100 - this.percent) + "%)";
    },
    percentText() {
      return this.isIndeterminate ? undefined : Math.round(this.percent) + "%";
    },
  },
});
</script>