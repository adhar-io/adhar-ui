// @ts-nocheck
<script context="module" lang="ts">
  export interface ToggleGroupProps {
    /** 'single' allows one active item, 'multiple' allows many (semantic hint) */
    type?: "single" | "multiple";
    orientation?: "horizontal" | "vertical";
    disabled?: boolean;
    className?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let disabled: ToggleGroupProps["disabled"];
  export let type: ToggleGroupProps["type"];
  export let orientation: ToggleGroupProps["orientation"];
  export let className: ToggleGroupProps["className"];
</script>

<div
  role="group"
  aria-label={"aria-label"}
  aria-labelledby={"aria-labelledby"}
  aria-disabled={disabled}
  data-type={type || "single"}
  data-orientation={orientation || "horizontal"}
  class={className}
>
  <slot />
</div>