// @ts-nocheck
<template>
  <button
    type="button"
    :id="props.id"
    :disabled="props.disabled"
    :aria-expanded="props.open ? true : false"
    :aria-controls="props['aria-controls']"
    :data-state="props.open ? 'open' : 'closed'"
    @click="
      async (event) =>
        props.disabled ? undefined : props.onOpenChange?.(!props.open)
    "
    :class="props.className"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export interface CollapsibleTriggerProps {
  open?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  /** ID of the content region this trigger controls */
  "aria-controls"?: string;
  onOpenChange?: (open: boolean) => void;
  children?: any;
}

export default defineComponent({
  name: "collapsible-trigger",

  props: ["id", "disabled", "open", "onOpenChange", "className"],
});
</script>