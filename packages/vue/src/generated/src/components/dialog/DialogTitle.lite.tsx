// @ts-nocheck
<template>
  <h2 :class="props.className"><slot /></h2>
</template>

<script lang="ts">
export interface DialogTitleProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "dialog-title",

  props: ["className"],
});
</script>