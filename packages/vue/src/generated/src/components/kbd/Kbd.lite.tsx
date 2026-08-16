// @ts-nocheck
<template>
  <kbd :aria-label="props['aria-label']" :class="props.className"><slot /></kbd>
</template>

<script lang="ts">
export interface KbdProps {
  className?: string;
  /** Spoken label for the key when the glyph is not descriptive (e.g. "⌘" → "Command") */
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "kbd",

  props: ["className"],
});
</script>