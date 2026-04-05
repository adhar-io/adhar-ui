// @ts-nocheck
<script context="module" lang="ts">
  export interface BadgeProps {
    variant?: "default" | "secondary" | "destructive" | "outline";
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: BadgeProps["className"];
</script>

<div role="status" class={className}><slot /></div>