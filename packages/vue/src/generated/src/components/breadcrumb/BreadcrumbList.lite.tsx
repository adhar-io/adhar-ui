// @ts-nocheck
<template>
  <ol :class="props.className">
    <slot />
  </ol>
</template>

<script lang="ts">
export interface BreadcrumbListProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "breadcrumb-list",

  props: ["className"],
});
</script>