// @ts-nocheck
<template>
  <div role="presentation" :class="props.className"><slot /></div>
</template>

<script lang="ts">
export interface CommandEmptyProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "command-empty",

  props: ["className"],
});
</script>