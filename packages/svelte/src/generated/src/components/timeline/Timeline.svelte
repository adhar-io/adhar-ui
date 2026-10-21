<script context="module" lang="ts">
  export interface TimelineProps {
    className?: string;
    id?: string;
    "aria-label"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { timelineVariants } from "./timeline.styles.ts";

  export let className: TimelineProps["className"] = undefined;
  export let id: TimelineProps["id"] = undefined;

  $: classes = () => {
    return cn(timelineVariants(), className);
  };
</script>

<ol {id} aria-label={"aria-label" || "Timeline"} class={classes()}><slot /></ol>