// @ts-nocheck
<script context="module" lang="ts">
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
</script>

<script lang="ts">
  export let id: CollapsibleTriggerProps["id"];
  export let disabled: CollapsibleTriggerProps["disabled"];
  export let open: CollapsibleTriggerProps["open"];
  export let onOpenChange: CollapsibleTriggerProps["onOpenChange"];
  export let className: CollapsibleTriggerProps["className"];
</script>

<button
  type="button"
  {id}
  {disabled}
  aria-expanded={open ? true : false}
  aria-controls={"aria-controls"}
  data-state={open ? "open" : "closed"}
  on:click={(event) => {
    disabled ? undefined : onOpenChange?.(!open);
  }}
  class={className}><slot /></button
>