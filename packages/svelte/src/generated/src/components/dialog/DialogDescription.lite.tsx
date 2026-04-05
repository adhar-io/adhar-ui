// @ts-nocheck
<script context="module" lang="ts">
  export interface DialogDescriptionProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: DialogDescriptionProps["className"];
</script>

<p class={className}><slot /></p>