// @ts-nocheck
<script context="module" lang="ts">
  export interface CommandListProps {
    id?: string;
    className?: string;
    "aria-label"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let id: CommandListProps["id"];
  export let className: CommandListProps["className"];
</script>

<div
  role="listbox"
  {id}
  aria-label={"aria-label" || "Suggestions"}
  class={className}
>
  <slot />
</div>