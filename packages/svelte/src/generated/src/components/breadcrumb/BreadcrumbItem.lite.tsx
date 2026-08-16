// @ts-nocheck
<script context="module" lang="ts">
  export interface BreadcrumbItemProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: BreadcrumbItemProps["className"];
</script>

<li class={className}><slot /></li>