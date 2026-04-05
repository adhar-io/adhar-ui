// @ts-nocheck
<script context="module" lang="ts">
  export interface CardTitleProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: CardTitleProps["className"];
</script>

<h3 class={className}><slot /></h3>