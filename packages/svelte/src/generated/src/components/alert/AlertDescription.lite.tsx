// @ts-nocheck
<script context="module" lang="ts">
  export interface AlertDescriptionProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: AlertDescriptionProps["className"];
</script>

<div class={className}><slot /></div>