// @ts-nocheck
<template>
  <li
    :aria-current="props.state === 'current' ? 'step' : undefined"
    :class="props.className"
  >
    <button
      type="button"
      :disabled="!props.clickable"
      :aria-label="props.label"
      @click="async (event) => props.onSelect?.()"
      :class="props.indicatorClass"
    >
      <template v-if="props.state === 'complete'">
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

      <template v-if="props.state !== 'complete'">
        <span>{{ props.stepNumber }}</span>
      </template>
    </button>
    <div>
      <template v-if="props.label">
        <span :class="props.labelClass">{{ props.label }}</span>
      </template>

      <template v-if="props.description">
        <span :class="props.descriptionClass">{{ props.description }}</span>
      </template>

      <slot />
    </div>
    <template v-if="!props.last">
      <span aria-hidden="true" :class="props.connectorClass"></span>
    </template>
  </li>
</template>

<script lang="ts">
export interface StepProps {
  state?: "complete" | "current" | "upcoming" | "error";
  /** Number shown in the indicator when not complete */
  stepNumber?: number;
  label?: string;
  description?: string;
  /** Hide the trailing connector on the last step */
  last?: boolean;
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
    "className",
    "clickable",
    "label",
    "onSelect",
    "indicatorClass",
    "stepNumber",
    "labelClass",
    "description",
    "descriptionClass",
    "last",
    "connectorClass",
  ],
});
</script>