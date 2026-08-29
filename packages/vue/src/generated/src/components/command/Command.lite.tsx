// @ts-nocheck
<template>
  <div
    :aria-label="props['aria-label'] || 'Command menu'"
    :class="props.className"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export interface CommandProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

// Command menu / palette container. Filtering & keyboard navigation are driven
// by the consumer (controlled), keeping the primitive framework-portable.

export default defineComponent({
  name: "command",

  props: ["className"],
});
</script>