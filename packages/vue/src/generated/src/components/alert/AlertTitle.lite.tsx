<template>
  <h5 :class="props.className"><slot /></h5>
</template>

<script lang="ts">
export interface AlertTitleProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "alert-title",

  props: ["className"],
});
</script>