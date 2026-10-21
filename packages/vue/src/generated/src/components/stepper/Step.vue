<template>
  <li
    :aria-current="stepState === 'current' ? 'step' : undefined"
    :data-state="stepState"
    :class="classes"
  >
    <button
      type="button"
      :disabled="!clickable"
      :aria-label="label ? label + ', ' + statusText : statusText"
      @click="async (event) => onSelect?.()"
      :class="indicatorClasses"
    >
      <template v-if="stepState === 'complete'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5"></path>
        </svg>
      </template>

      <template v-if="stepState === 'error'">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </template>

      <template v-if="stepState === 'current' || stepState === 'upcoming'">
        <span aria-hidden="true">{{ stepNumber }}</span>
      </template>
    </button>
    <div class="min-w-0">
      <template v-if="label">
        <span aria-hidden="true" :class="labelClasses">{{ label }}</span>
      </template>

      <template v-if="description">
        <span :class="descriptionClasses">{{ description }}</span>
      </template>

      <slot />
    </div>
    <template v-if="!last">
      <span aria-hidden="true" :class="connectorClasses"></span>
    </template>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import {
  stepConnectorClass,
  stepDescriptionVariants,
  stepIndicatorClass,
  stepLabelClass,
  stepVariants,
} from "./stepper.styles.ts";

export interface StepProps {
  state?: "complete" | "current" | "upcoming" | "error";
  /** Number shown in the indicator when not complete */
  stepNumber?: number;
  label?: string;
  description?: string;
  /** Match the parent Stepper’s orientation */
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "default" | "lg";
  /** Hide the trailing connector on the last step */
  last?: boolean;
  /** Lets users jump to this step via the indicator */
  clickable?: boolean;
  className?: string;
  indicatorClass?: string;
  connectorClass?: string;
  labelClass?: string;
  descriptionClass?: string;
  onSelect?: () => void;
  children?: any;
}

export default defineComponent({
  name: "step",

  props: [
    "state",
    "orientation",
    "className",
    "size",
    "clickable",
    "indicatorClass",
    "connectorClass",
    "labelClass",
    "descriptionClass",
    "label",
    "onSelect",
    "stepNumber",
    "description",
    "last",
  ],

  computed: {
    stepState() {
      return this.state || "upcoming";
    },
    classes() {
      return cn(
        stepVariants({
          orientation: this.orientation,
        }),
        this.className
      );
    },
    indicatorClasses() {
      return cn(
        stepIndicatorClass(this.stepState, this.size),
        this.clickable
          ? "cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          : "cursor-default",
        this.indicatorClass
      );
    },
    connectorClasses() {
      return cn(
        stepConnectorClass(this.stepState, this.orientation),
        this.connectorClass
      );
    },
    labelClasses() {
      return cn(stepLabelClass(this.stepState), "block", this.labelClass);
    },
    descriptionClasses() {
      return cn(stepDescriptionVariants(), "block", this.descriptionClass);
    },
    statusText() {
      if (this.stepState === "complete") return "Completed";
      if (this.stepState === "current") return "Current step";
      if (this.stepState === "error") return "Error";
      return "Not started";
    },
  },
});
</script>