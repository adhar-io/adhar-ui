// @ts-nocheck
<template>
  <span
    :tabIndex="0"
    :aria-describedby="props['aria-describedby']"
    :class="props.className"
    ><slot
  /></span>
</template>

<script lang="ts">
export interface HoverCardTriggerProps {
  className?: string;
  /** ID of the content this trigger describes (for AT association) */
  "aria-describedby"?: string;
  children?: any;
}

// Focusable so the card opens on keyboard focus (group-focus-within), not just hover.

export default defineComponent({
  name: "hover-card-trigger",

  props: ["className"],
});
</script>