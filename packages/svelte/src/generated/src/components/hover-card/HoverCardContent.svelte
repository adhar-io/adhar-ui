<script context="module" lang="ts">
  export interface HoverCardContentProps {
    side?: "top" | "bottom" | "left" | "right";
    id?: string;
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { hoverCardContentVariants } from "./hover-card.styles.ts";

  export let side: HoverCardContentProps["side"] = undefined;
  export let className: HoverCardContentProps["className"] = undefined;
  export let id: HoverCardContentProps["id"] = undefined;

  $: classes = () => {
    return cn(
      hoverCardContentVariants({
        side: side,
      }),
      className
    );
  };
</script>

<div role="tooltip" {id} data-side={side || "bottom"} class={classes()}>
  <slot />
</div>