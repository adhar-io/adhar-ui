// @ts-nocheck
<template>
  <div
    role="listbox"
    :id="props.id"
    :aria-label="props['aria-label'] || 'Suggestions'"
    :class="props.className"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export interface CommandListProps {
  id?: string;
  className?: string;
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "command-list",

  props: ["id", "className"],
});
</script>