// @ts-nocheck
<template>
  <span
    role="link"
    aria-disabled="true"
    aria-current="page"
    :class="props.className"
    ><slot
  /></span>
</template>

<script lang="ts">
export interface BreadcrumbPageProps {
  className?: string;
  children?: any;
}

// The current page — not a link. aria-current="page" marks it for AT.

export default defineComponent({
  name: "breadcrumb-page",

  props: ["className"],
});
</script>