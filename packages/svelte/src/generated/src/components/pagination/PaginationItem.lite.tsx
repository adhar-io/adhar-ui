// @ts-nocheck
<script context="module" lang="ts">
  export interface PaginationItemProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: PaginationItemProps["className"];
</script>

<li class={className}><slot /></li>