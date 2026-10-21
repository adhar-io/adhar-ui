<script context="module" lang="ts">
  export interface AccordionTriggerProps {
    open?: boolean;
    /** The owning item’s value — lets Accordion’s onValueChange handle the click */
    value?: string;
    disabled?: boolean;
    className?: string;
    /** Class for the heading element wrapping the trigger */
    headingClass?: string;
    /** Give the trigger an id and pass it to AccordionContent `aria-labelledby` */
    id?: string;
    /** ID of the AccordionContent region this trigger toggles */
    "aria-controls"?: string;
    onClick?: () => void;
    children?: any;
  }

  // Wrapped in a heading per the WAI-ARIA accordion pattern, so screen-reader
  // users can jump between sections with heading navigation.
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { accordionTriggerVariants } from "./accordion.styles.ts";

  export let className: AccordionTriggerProps["className"] = undefined;
  export let headingClass: AccordionTriggerProps["headingClass"] = undefined;
  export let id: AccordionTriggerProps["id"] = undefined;
  export let disabled: AccordionTriggerProps["disabled"] = undefined;
  export let open: AccordionTriggerProps["open"] = undefined;
  export let value: AccordionTriggerProps["value"] = undefined;
  export let onClick: AccordionTriggerProps["onClick"] = undefined;

  $: classes = () => {
    return cn(
      accordionTriggerVariants(),
      "w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm disabled:cursor-not-allowed disabled:opacity-50",
      className
    );
  };
  $: headingClasses = () => {
    return cn("flex", headingClass);
  };
</script>

<h3 class={headingClasses()}>
  <button
    type="button"
    data-accordion-trigger=""
    {id}
    {disabled}
    aria-expanded={open ? true : false}
    aria-controls={"aria-controls"}
    data-state={open ? "open" : "closed"}
    data-value={value}
    on:click={(event) => {
      onClick?.();
    }}
    class={classes()}
    ><slot /><svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      class="shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none"
      ><path d="m6 9 6 6 6-6" /></svg
    ></button
  >
</h3>