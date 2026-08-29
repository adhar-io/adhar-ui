// @ts-nocheck
<script context="module" lang="ts">
  export interface CollapsibleContentProps {
    open?: boolean;
    id?: string;
    className?: string;
    /** Class for the required inner overflow-hidden wrapper */
    innerClass?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let id: CollapsibleContentProps["id"];
  export let open: CollapsibleContentProps["open"];
  export let className: CollapsibleContentProps["className"];
  export let innerClass: CollapsibleContentProps["innerClass"];
</script>

<div
  {id}
  data-state={open ? "open" : "closed"}
  aria-hidden={open ? false : true}
  class={className}
>
  <div class={innerClass}><slot /></div>
</div>