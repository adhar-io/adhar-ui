<script context="module" lang="ts">
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
</script>

<script lang="ts">
  export let id: CollapsibleTriggerProps["id"] = undefined;
  export let disabled: CollapsibleTriggerProps["disabled"] = undefined;
  export let open: CollapsibleTriggerProps["open"] = undefined;
  export let onOpenChange: CollapsibleTriggerProps["onOpenChange"] = undefined;
  export let className: CollapsibleTriggerProps["className"] = undefined;
</script>

<button
  type="button"
  {id}
  {disabled}
  aria-expanded={open ? true : false}
  aria-controls={"aria-controls"}
  aria-label={"aria-label"}
  data-state={open ? "open" : "closed"}
  on:click={(event) => {
    disabled ? undefined : onOpenChange?.(!open);
  }}
  class={className}><slot /></button
>