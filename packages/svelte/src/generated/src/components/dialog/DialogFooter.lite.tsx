// @ts-nocheck
<script context="module" lang="ts">
  export interface DialogFooterProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: DialogFooterProps["className"];
</script>

<div class={className}><slot /></div>