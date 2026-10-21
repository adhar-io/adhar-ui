<template>
  <span
    :tabIndex="focusable === false ? undefined : 0"
    :aria-describedby="'aria-describedby'"
    :class="className"
    ><slot
  /></span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface HoverCardTriggerProps {
  className?: string;
  /** ID of the content this trigger describes (for AT association) */
  "aria-describedby"?: string;
  /** Set false when the child is already focusable (a link or button) */
  focusable?: boolean;
  children?: any;
}

// Focusable so the card opens on keyboard focus (group-focus-within), not just hover.

export default defineComponent({
  name: "hover-card-trigger",

  props: ["focusable", "className"],
});
</script>