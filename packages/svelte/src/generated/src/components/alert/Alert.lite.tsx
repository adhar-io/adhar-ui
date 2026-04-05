// @ts-nocheck
<script context="module" lang="ts">
  export interface AlertProps {
    variant?: "default" | "destructive" | "success" | "warning" | "info";
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: AlertProps["className"];
</script>

<div role="alert" class={className}><slot /></div>