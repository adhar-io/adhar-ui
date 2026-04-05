<template>
  <div :data-value="props.value" :class="props.className"><slot /></div>
</template>

<script lang="ts">
export interface AccordionItemProps {
  value: string;
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "accordion-item",

  props: ["value", "className"],
});
</script>