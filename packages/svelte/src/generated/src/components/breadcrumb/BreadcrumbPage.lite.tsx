// @ts-nocheck
<script context="module" lang="ts">
  export interface BreadcrumbPageProps {
    className?: string;
    children?: any;
  }

  // The current page — not a link. aria-current="page" marks it for AT.
</script>

<script lang="ts">
  export let className: BreadcrumbPageProps["className"];
</script>

<span role="link" aria-disabled="true" aria-current="page" class={className}
  ><slot /></span
>