// @ts-nocheck
<script context="module" lang="ts">
  export interface CommandShortcutProps {
    className?: string;
    "aria-label"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: CommandShortcutProps["className"];
</script>

<span aria-label={"aria-label"} class={className}><slot /></span>