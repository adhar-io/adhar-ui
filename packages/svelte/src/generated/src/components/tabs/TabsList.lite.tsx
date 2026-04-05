// @ts-nocheck
<script context="module" lang="ts">
  export interface TabsListProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: TabsListProps["className"];
</script>

<div role="tablist" class={className}><slot /></div>