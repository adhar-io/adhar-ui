// @ts-nocheck
<template>
  <div
    :tabIndex="props.focusable ? 0 : undefined"
    :role="props.focusable ? 'region' : undefined"
    :aria-label="props['aria-label']"
    :data-orientation="props.orientation || 'vertical'"
    :class="props.className"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export interface ScrollAreaProps {
  orientation?: "vertical" | "horizontal" | "both";
  className?: string;
  /** Adds tabindex so keyboard users can scroll the region */
  focusable?: boolean;
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "scroll-area",

  props: ["focusable", "orientation", "className"],
});
</script>