<script context="module" lang="ts">
  export interface AccordionContentProps {
    open?: boolean;
    className?: string;
    /** Class for the inner padding wrapper */
    innerClass?: string;
    /** Give the region an id and pass it to AccordionTrigger `aria-controls` */
    id?: string;
    /** ID of the AccordionTrigger that labels this region */
    "aria-labelledby"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { accordionContentVariants } from "./accordion.styles.ts";

  export let className: AccordionContentProps["className"] = undefined;
  export let innerClass: AccordionContentProps["innerClass"] = undefined;
  export let id: AccordionContentProps["id"] = undefined;
  export let open: AccordionContentProps["open"] = undefined;

  $: classes = () => {
    return cn(accordionContentVariants(), className);
  };
  $: innerClasses = () => {
    return cn("pb-4 pt-0", innerClass);
  };
</script>

<div
  role="region"
  {id}
  aria-labelledby={"aria-labelledby"}
  data-state={open ? "open" : "closed"}
  hidden={!open}
  class={classes()}
>
  <div class={innerClasses()}><slot /></div>
</div>