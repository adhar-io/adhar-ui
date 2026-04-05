<template>
  <div :class="props.className"><slot /></div>
</template>

<script lang="ts">
export interface CardHeaderProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "card-header",

  props: ["className"],
});
</script>