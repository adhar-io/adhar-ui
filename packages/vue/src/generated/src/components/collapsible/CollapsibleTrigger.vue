<template>
  <button
    type="button"
    :id="id"
    :disabled="disabled"
    :aria-expanded="open ? true : false"
    :aria-controls="'aria-controls'"
    :aria-label="'aria-label'"
    :data-state="open ? 'open' : 'closed'"
    @click="async (event) => (disabled ? undefined : onOpenChange?.(!open))"
    :class="className"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface CollapsibleTriggerProps {
  open?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  /** ID of the content region this trigger controls */
  "aria-controls"?: string;
  "aria-label"?: string;
  onOpenChange?: (open: boolean) => void;
  children?: any;
}

export default defineComponent({
  name: "collapsible-trigger",

  props: ["id", "disabled", "open", "onOpenChange", "className"],
});
</script>