// @ts-nocheck
<script context="module" lang="ts">
  export interface CardFooterProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: CardFooterProps["className"];
</script>

<div class={className}><slot /></div>