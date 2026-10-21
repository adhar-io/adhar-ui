<script context="module" lang="ts">
  export interface CollapsibleProps {
    open?: boolean;
    disabled?: boolean;
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let open: CollapsibleProps["open"] = undefined;
  export let disabled: CollapsibleProps["disabled"] = undefined;
  export let className: CollapsibleProps["className"] = undefined;
</script>

<div
  data-state={open ? "open" : "closed"}
  data-disabled={disabled ? "" : undefined}
  class={className}
>
  <slot />
</div>