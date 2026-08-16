// @ts-nocheck
<template>
  <nav
    role="navigation"
    :aria-label="props['aria-label'] || 'Pagination'"
    :class="props.className"
  >
    <slot />
  </nav>
</template>

<script lang="ts">
export interface PaginationProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "pagination",

  props: ["className"],
});
</script>