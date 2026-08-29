// @ts-nocheck
<script context="module" lang="ts">
  export interface HoverCardProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: HoverCardProps["className"];
</script>

<div class={className}><slot /></div>