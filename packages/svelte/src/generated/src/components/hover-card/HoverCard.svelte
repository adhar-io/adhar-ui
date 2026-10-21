<script context="module" lang="ts">
  export interface HoverCardProps {
    className?: string;
    children?: any;
  }

  // CSS-only: HoverCardContent is shown while the pointer is over, or keyboard
  // focus is inside, this wrapper. Escape is not needed since moving away hides it.
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { hoverCardVariants } from "./hover-card.styles.ts";

  export let className: HoverCardProps["className"] = undefined;

  $: classes = () => {
    return cn(hoverCardVariants(), className);
  };
</script>

<div class={classes()}><slot /></div>