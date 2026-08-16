// @ts-nocheck
<template>
  <div :class="props.className"><slot /></div>
</template>

<script lang="ts">
export interface AlertDescriptionProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "alert-description",

  props: ["className"],
});
</script>