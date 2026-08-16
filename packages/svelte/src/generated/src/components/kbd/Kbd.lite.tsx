// @ts-nocheck
<script context="module" lang="ts">
  export interface KbdProps {
    className?: string;
    /** Spoken label for the key when the glyph is not descriptive (e.g. "⌘" → "Command") */
    "aria-label"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: KbdProps["className"];
</script>

<kbd aria-label={"aria-label"} class={className}><slot /></kbd>