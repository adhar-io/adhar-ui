// @ts-nocheck
<template>
  <span :aria-label="props['aria-label']" :class="props.className"
    ><slot
  /></span>
</template>

<script lang="ts">
export interface CommandShortcutProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "command-shortcut",

  props: ["className"],
});
</script>