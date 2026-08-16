// @ts-nocheck
<template>
  <p :class="props.className"><slot /></p>
</template>

<script lang="ts">
export interface DialogDescriptionProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "dialog-description",

  props: ["className"],
});
</script>