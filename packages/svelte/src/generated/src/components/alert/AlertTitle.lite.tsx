// @ts-nocheck
<script context="module" lang="ts">
  export interface AlertTitleProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: AlertTitleProps["className"];
</script>

<h5 class={className}><slot /></h5>