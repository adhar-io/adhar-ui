<template>
  <p :class="props.className"><slot /></p>
</template>

<script lang="ts">
export interface CardDescriptionProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "card-description",

  props: ["className"],
});
</script>