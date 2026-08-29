// @ts-nocheck
<script context="module" lang="ts">
  export interface CommandEmptyProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: CommandEmptyProps["className"];
</script>

<div role="presentation" class={className}><slot /></div>