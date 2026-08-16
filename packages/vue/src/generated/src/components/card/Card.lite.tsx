// @ts-nocheck
<template>
  <div :class="props.className"><slot /></div>
</template>

<script lang="ts">
export interface CardProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "card",

  props: ["className"],
});
</script>