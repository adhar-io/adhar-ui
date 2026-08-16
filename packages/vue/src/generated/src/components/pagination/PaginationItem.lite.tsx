// @ts-nocheck
<template>
  <li :class="props.className"><slot /></li>
</template>

<script lang="ts">
export interface PaginationItemProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "pagination-item",

  props: ["className"],
});
</script>