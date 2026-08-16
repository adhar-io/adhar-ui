// @ts-nocheck
<template>
  <div
    role="radiogroup"
    :aria-label="props['aria-label']"
    :aria-labelledby="props['aria-labelledby']"
    :aria-orientation="props.orientation || 'vertical'"
    :aria-required="props.required"
    :aria-disabled="props.disabled"
    :data-orientation="props.orientation || 'vertical'"
    :class="props.className"
  >
    <slot />
  </div>
</template>

<script lang="ts">
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

export default defineComponent({
  name: "radio-group",

  props: ["orientation", "required", "disabled", "className"],
});
</script>