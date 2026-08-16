// @ts-nocheck
<script context="module" lang="ts">
  export interface BreadcrumbListProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: BreadcrumbListProps["className"];
</script>

<ol class={className}><slot /></ol>