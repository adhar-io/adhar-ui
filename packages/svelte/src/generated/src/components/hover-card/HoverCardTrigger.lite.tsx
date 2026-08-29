// @ts-nocheck
<script context="module" lang="ts">
  export interface HoverCardTriggerProps {
    className?: string;
    /** ID of the content this trigger describes (for AT association) */
    "aria-describedby"?: string;
    children?: any;
  }

  // Focusable so the card opens on keyboard focus (group-focus-within), not just hover.
</script>

<script lang="ts">
  export let className: HoverCardTriggerProps["className"];
</script>

<span tabIndex={0} aria-describedby={"aria-describedby"} class={className}
  ><slot /></span
>