// @ts-nocheck
<script context="module" lang="ts">
  export interface CardProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: CardProps["className"];
</script>

<div class={className}><slot /></div>