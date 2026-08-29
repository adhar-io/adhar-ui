// @ts-nocheck
<script context="module" lang="ts">
  export interface ScrollAreaProps {
    orientation?: "vertical" | "horizontal" | "both";
    className?: string;
    /** Adds tabindex so keyboard users can scroll the region */
    focusable?: boolean;
    "aria-label"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let focusable: ScrollAreaProps["focusable"];
  export let orientation: ScrollAreaProps["orientation"];
  export let className: ScrollAreaProps["className"];
</script>

<div
  tabIndex={focusable ? 0 : undefined}
  role={focusable ? "region" : undefined}
  aria-label={"aria-label"}
  data-orientation={orientation || "vertical"}
  class={className}
>
  <slot />
</div>