<script context="module" lang="ts">
  export interface CollapsibleContentProps {
    open?: boolean;
    id?: string;
    className?: string;
    /** Class for the required inner overflow-hidden wrapper */
    innerClass?: string;
    /** ID of the trigger, to expose the content as a labelled region */
    "aria-labelledby"?: string;
    children?: any;
  }

  // Animates height with the grid-rows 0fr → 1fr technique; closed content is
  // `invisible`, so it is skipped by Tab and screen readers but stays mounted.
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import {
    collapsibleContentInnerVariants,
    collapsibleContentVariants,
  } from "./collapsible.styles.ts";

  export let open: CollapsibleContentProps["open"] = undefined;
  export let className: CollapsibleContentProps["className"] = undefined;
  export let innerClass: CollapsibleContentProps["innerClass"] = undefined;
  export let id: CollapsibleContentProps["id"] = undefined;

  $: classes = () => {
    return cn(
      collapsibleContentVariants({
        open: !!open,
      }),
      className
    );
  };
  $: innerClasses = () => {
    return cn(collapsibleContentInnerVariants(), innerClass);
  };
</script>

<div
  {id}
  role={"aria-labelledby" ? "region" : undefined}
  aria-labelledby={"aria-labelledby"}
  data-state={open ? "open" : "closed"}
  class={classes()}
>
  <div class={innerClasses()}><slot /></div>
</div>