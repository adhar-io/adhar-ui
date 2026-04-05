// @ts-nocheck
<script context="module" lang="ts">
  export interface CardContentProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: CardContentProps["className"];
</script>

<div class={className}><slot /></div>