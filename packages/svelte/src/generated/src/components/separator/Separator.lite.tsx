// @ts-nocheck
<script context="module" lang="ts">
  export interface SeparatorProps {
    orientation?: "horizontal" | "vertical";
    className?: string;
  }
</script>

<script lang="ts">
  export let orientation: SeparatorProps["orientation"];
  export let className: SeparatorProps["className"];
</script>

<div
  role="separator"
  aria-orientation={orientation || "horizontal"}
  class={className}
/>