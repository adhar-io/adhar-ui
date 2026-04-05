// @ts-nocheck
<script context="module" lang="ts">
  export interface CardHeaderProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: CardHeaderProps["className"];
</script>

<div class={className}><slot /></div>