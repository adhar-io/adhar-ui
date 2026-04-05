// @ts-nocheck
<script context="module" lang="ts">
  export interface AccordionItemProps {
    value: string;
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let value: AccordionItemProps["value"];
  export let className: AccordionItemProps["className"];
</script>

<div data-value={value} class={className}><slot /></div>