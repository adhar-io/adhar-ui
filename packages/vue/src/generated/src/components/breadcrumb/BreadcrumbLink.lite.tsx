// @ts-nocheck
<template>
  <a
    :href="props.href"
    @click="async (event) => props.onClick?.(event)"
    :class="props.className"
    ><slot
  /></a>
</template>

<script lang="ts">
export interface BreadcrumbLinkProps {
  href?: string;
  className?: string;
  onClick?: (event: any) => void;
  children?: any;
}

export default defineComponent({
  name: "breadcrumb-link",

  props: ["href", "onClick", "className"],
});
</script>