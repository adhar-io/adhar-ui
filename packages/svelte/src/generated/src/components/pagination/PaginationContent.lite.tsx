// @ts-nocheck
<script context="module" lang="ts">
  export interface PaginationContentProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: PaginationContentProps["className"];
</script>

<ul class={className}><slot /></ul>