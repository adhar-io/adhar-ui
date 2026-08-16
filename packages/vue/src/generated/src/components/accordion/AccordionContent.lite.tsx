// @ts-nocheck
<template>
  <div
    role="region"
    :hidden="!props.open"
    :style="{
      overflow: 'hidden',
      transition: 'height 0.2s ease-out',
    }"
    :class="props.className"
  >
    <div><slot /></div>
  </div>
</template>

<script lang="ts">
export interface AccordionContentProps {
  open?: boolean;
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "accordion-content",

  props: ["open", "className"],
});
</script>