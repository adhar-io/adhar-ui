// @ts-nocheck
<template>
  <nav
    :aria-label="props['aria-label'] || 'Breadcrumb'"
    :class="props.className"
  >
    <slot />
  </nav>
</template>

<script lang="ts">
export interface BreadcrumbProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "breadcrumb",

  props: ["className"],
});
</script>