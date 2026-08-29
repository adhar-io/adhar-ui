// @ts-nocheck
<script context="module" lang="ts">
  export interface StepperProps {
    orientation?: "horizontal" | "vertical";
    className?: string;
    "aria-label"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let orientation: StepperProps["orientation"];
  export let className: StepperProps["className"];
</script>

<ol
  aria-label={"aria-label" || "Progress"}
  data-orientation={orientation || "horizontal"}
  class={className}
>
  <slot />
</ol>