<template>
  <div
    role="progressbar"
    :aria-valuenow="props.value || 0"
    :aria-valuemin="0"
    :aria-valuemax="props.max || 100"
    :aria-label="props['aria-label'] || 'Progress'"
    :class="props.className"
  >
    <div
      :style="{
        transform: `translateX(-${100 - (props.value || 0)}%)`,
      }"
      :class="props.indicatorClass"
    ></div>
  </div>
</template>

<script lang="ts">
export interface ProgressProps {
  value?: number;
  max?: number;
  className?: string;
  indicatorClass?: string;
  "aria-label"?: string;
}

export default defineComponent({
  name: "progress",

  props: ["value", "max", "className", "indicatorClass"],
});
</script>