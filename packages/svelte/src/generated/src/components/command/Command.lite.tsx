// @ts-nocheck
<script context="module" lang="ts">
  export interface CommandProps {
    className?: string;
    "aria-label"?: string;
    children?: any;
  }

  // Command menu / palette container. Filtering & keyboard navigation are driven
  // by the consumer (controlled), keeping the primitive framework-portable.
</script>

<script lang="ts">
  export let className: CommandProps["className"];
</script>

<div aria-label={"aria-label" || "Command menu"} class={className}>
  <slot />
</div>