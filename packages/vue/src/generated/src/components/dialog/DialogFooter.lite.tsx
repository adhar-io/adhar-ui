// @ts-nocheck
<template>
  <div :class="props.className"><slot /></div>
</template>

<script lang="ts">
export interface DialogFooterProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "dialog-footer",

  props: ["className"],
});
</script>