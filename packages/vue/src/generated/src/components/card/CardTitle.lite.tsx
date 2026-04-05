<template>
  <h3 :class="props.className"><slot /></h3>
</template>

<script lang="ts">
export interface CardTitleProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "card-title",

  props: ["className"],
});
</script>