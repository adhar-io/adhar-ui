// @ts-nocheck
<script context="module" lang="ts">
  export interface BreadcrumbProps {
    className?: string;
    "aria-label"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: BreadcrumbProps["className"];
</script>

<nav aria-label={"aria-label" || "Breadcrumb"} class={className}><slot /></nav>