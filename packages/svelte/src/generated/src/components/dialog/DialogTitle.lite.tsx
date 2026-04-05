// @ts-nocheck
<script context="module" lang="ts">
  export interface DialogTitleProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: DialogTitleProps["className"];
</script>

<h2 class={className}><slot /></h2>