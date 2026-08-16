// @ts-nocheck
<script context="module" lang="ts">
  export interface RadioGroupProps {
    /** The value of the currently selected item */
    value?: string;
    /** Form field name (rendered as a hidden input by consumers if needed) */
    name?: string;
    /** Disables the whole group */
    disabled?: boolean;
    /** Marks the group as required for form validation */
    required?: boolean;
    /** Layout direction — also drives arrow-key navigation semantics */
    orientation?: "horizontal" | "vertical";
    className?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let orientation: RadioGroupProps["orientation"];
  export let required: RadioGroupProps["required"];
  export let disabled: RadioGroupProps["disabled"];
  export let className: RadioGroupProps["className"];
</script>

<div
  role="radiogroup"
  aria-label={"aria-label"}
  aria-labelledby={"aria-labelledby"}
  aria-orientation={orientation || "vertical"}
  aria-required={required}
  aria-disabled={disabled}
  data-orientation={orientation || "vertical"}
  class={className}
>
  <slot />
</div>