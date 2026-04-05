// @ts-nocheck
<script context="module" lang="ts">
  export interface DropdownMenuSeparatorProps {
    className?: string;
  }
</script>

<script lang="ts">
  export let className: DropdownMenuSeparatorProps["className"];
</script>

<div role="separator" class={className} />