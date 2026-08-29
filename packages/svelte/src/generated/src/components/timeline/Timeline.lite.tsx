// @ts-nocheck
<script context="module" lang="ts">
  export interface TimelineProps {
    className?: string;
    "aria-label"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: TimelineProps["className"];
</script>

<ol aria-label={"aria-label" || "Timeline"} class={className}><slot /></ol>