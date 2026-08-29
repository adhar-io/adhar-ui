// @ts-nocheck
<template>
  <div role="tooltip" :id="props.id" :class="props.className"><slot /></div>
</template>

<script lang="ts">
export interface HoverCardContentProps {
  id?: string;
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "hover-card-content",

  props: ["id", "className"],
});
</script>