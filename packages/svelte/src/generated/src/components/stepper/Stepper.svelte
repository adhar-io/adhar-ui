<script context="module" lang="ts">
  export interface StepperProps {
    /** Pass the same orientation to each Step */
    orientation?: "horizontal" | "vertical";
    className?: string;
    "aria-label"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { stepperVariants } from "./stepper.styles.ts";

  export let orientation: StepperProps["orientation"] = undefined;
  export let className: StepperProps["className"] = undefined;

  $: classes = () => {
    return cn(
      stepperVariants({
        orientation: orientation,
      }),
      className
    );
  };
</script>

<ol
  aria-label={"aria-label" || "Progress"}
  data-orientation={orientation || "horizontal"}
  class={classes()}
>
  <slot />
</ol>