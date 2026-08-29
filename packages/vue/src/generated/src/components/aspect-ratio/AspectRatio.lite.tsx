// @ts-nocheck
<template>
  <div
    :style="{
      aspectRatio: props.ratio || '16 / 9',
    }"
    :class="props.className"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export interface AspectRatioProps {
  /** CSS aspect-ratio value, e.g. "16 / 9", "1 / 1", "4 / 3" (default "16 / 9") */
  ratio?: string;
  className?: string;
  children?: any;
}

// Constrains its child to a fixed aspect ratio using the native CSS property.

export default defineComponent({
  name: "aspect-ratio",

  props: ["ratio", "className"],
});
</script>