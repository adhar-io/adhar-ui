// @ts-nocheck
<script context="module" lang="ts">
  export interface CollapsibleProps {
    open?: boolean;
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let open: CollapsibleProps["open"];
  export let className: CollapsibleProps["className"];
</script>

<div data-state={open ? "open" : "closed"} class={className}><slot /></div>