// @ts-nocheck
<template>
  <ul :class="props.className">
    <slot />
  </ul>
</template>

<script lang="ts">
export interface PaginationContentProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "pagination-content",

  props: ["className"],
});
</script>