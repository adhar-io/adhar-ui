// @ts-nocheck
<template>
  <div :class="props.className"><slot /></div>
</template>

<script lang="ts">
export interface DialogHeaderProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "dialog-header",

  props: ["className"],
});
</script>