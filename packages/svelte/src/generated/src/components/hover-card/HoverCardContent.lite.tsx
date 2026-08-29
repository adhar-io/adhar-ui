// @ts-nocheck
<script context="module" lang="ts">
  export interface HoverCardContentProps {
    id?: string;
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let id: HoverCardContentProps["id"];
  export let className: HoverCardContentProps["className"];
</script>

<div role="tooltip" {id} class={className}><slot /></div>