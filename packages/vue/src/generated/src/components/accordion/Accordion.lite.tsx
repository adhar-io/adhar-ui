// @ts-nocheck
<template>
  <div :data-type="props.type || 'single'" :class="props.className">
    <slot />
  </div>
</template>

<script lang="ts">
export interface AccordionProps {
  type?: "single" | "multiple";
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "accordion",

  props: ["type", "className"],
});
</script>