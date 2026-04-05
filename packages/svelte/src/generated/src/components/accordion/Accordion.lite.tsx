// @ts-nocheck
<script context="module" lang="ts">
  export interface AccordionProps {
    type?: "single" | "multiple";
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let type: AccordionProps["type"];
  export let className: AccordionProps["className"];
</script>

<div data-type={type || "single"} class={className}><slot /></div>