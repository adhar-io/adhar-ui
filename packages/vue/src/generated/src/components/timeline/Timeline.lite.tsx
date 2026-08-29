// @ts-nocheck
<template>
  <ol :aria-label="props['aria-label'] || 'Timeline'" :class="props.className">
    <slot />
  </ol>
</template>

<script lang="ts">
export interface TimelineProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "timeline",

  props: ["className"],
});
</script>