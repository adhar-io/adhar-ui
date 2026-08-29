// @ts-nocheck
<script context="module" lang="ts">
  export interface CommandSeparatorProps {
    className?: string;
  }
</script>

<script lang="ts">
  export let className: CommandSeparatorProps["className"];
</script>

<div role="separator" aria-orientation="horizontal" class={className} />