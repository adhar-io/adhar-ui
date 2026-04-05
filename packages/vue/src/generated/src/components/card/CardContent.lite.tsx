<template>
  <div :class="props.className"><slot /></div>
</template>

<script lang="ts">
export interface CardContentProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "card-content",

  props: ["className"],
});
</script>