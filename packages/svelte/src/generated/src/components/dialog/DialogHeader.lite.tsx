// @ts-nocheck
<script context="module" lang="ts">
  export interface DialogHeaderProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: DialogHeaderProps["className"];
</script>

<div class={className}><slot /></div>