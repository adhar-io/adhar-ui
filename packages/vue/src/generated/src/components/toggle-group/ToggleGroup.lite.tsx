// @ts-nocheck
<template>
  <div
    role="group"
    :aria-label="props['aria-label']"
    :aria-labelledby="props['aria-labelledby']"
    :aria-disabled="props.disabled"
    :data-type="props.type || 'single'"
    :data-orientation="props.orientation || 'horizontal'"
    :class="props.className"
  >
    <slot />
  </div>
</template>

<script lang="ts">
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

export default defineComponent({
  name: "toggle-group",

  props: ["disabled", "type", "orientation", "className"],
});
</script>