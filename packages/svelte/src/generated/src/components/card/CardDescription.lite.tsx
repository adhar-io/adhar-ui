// @ts-nocheck
<script context="module" lang="ts">
  export interface CardDescriptionProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: CardDescriptionProps["className"];
</script>

<p class={className}><slot /></p>