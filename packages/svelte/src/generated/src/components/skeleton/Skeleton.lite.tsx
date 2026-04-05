// @ts-nocheck
<script context="module" lang="ts">
  export interface SkeletonProps {
    className?: string;
  }
</script>

<script lang="ts">
  export let className: SkeletonProps["className"];
</script>

<div aria-hidden="true" role="presentation" class={className} />