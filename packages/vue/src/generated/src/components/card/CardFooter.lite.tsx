<template>
  <div :class="props.className"><slot /></div>
</template>

<script lang="ts">
export interface CardFooterProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "card-footer",

  props: ["className"],
});
</script>