// @ts-nocheck
<template>
  <li :class="props.className"><slot /></li>
</template>

<script lang="ts">
export interface BreadcrumbItemProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "breadcrumb-item",

  props: ["className"],
});
</script>