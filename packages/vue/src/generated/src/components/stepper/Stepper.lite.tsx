// @ts-nocheck
<template>
  <ol
    :aria-label="props['aria-label'] || 'Progress'"
    :data-orientation="props.orientation || 'horizontal'"
    :class="props.className"
  >
    <slot />
  </ol>
</template>

<script lang="ts">
export interface StepperProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "stepper",

  props: ["orientation", "className"],
});
</script>