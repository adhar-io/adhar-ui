<script context="module" lang="ts">
  export interface AccordionItemProps {
    value: string;
    /** Exposes data-state="open" for styling */
    open?: boolean;
    disabled?: boolean;
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { accordionItemVariants } from "./accordion.styles.ts";

  export let className: AccordionItemProps["className"] = undefined;
  export let value: AccordionItemProps["value"];
  export let open: AccordionItemProps["open"] = undefined;
  export let disabled: AccordionItemProps["disabled"] = undefined;

  $: classes = () => {
    return cn(accordionItemVariants(), className);
  };
</script>

<div
  data-value={value}
  data-state={open ? "open" : "closed"}
  data-disabled={disabled ? "" : undefined}
  class={classes()}
>
  <slot />
</div>