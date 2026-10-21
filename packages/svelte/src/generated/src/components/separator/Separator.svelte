<script context="module" lang="ts">
  export interface SeparatorProps {
    orientation?: "horizontal" | "vertical";
    /**
     * Purely visual separators (the default) are hidden from assistive tech.
     * Set false when the separator divides meaningful sections.
     */
    decorative?: boolean;
    className?: string;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { separatorVariants } from "./separator.styles.ts";

  export let orientation: SeparatorProps["orientation"] = undefined;
  export let className: SeparatorProps["className"] = undefined;
  export let decorative: SeparatorProps["decorative"] = undefined;

  $: classes = () => {
    return cn(
      separatorVariants({
        orientation: orientation,
      }),
      className
    );
  };
  $: isDecorative = () => {
    return decorative !== false;
  };
</script>

<div
  role={isDecorative() ? "none" : "separator"}
  aria-orientation={isDecorative() ? undefined : orientation || "horizontal"}
  data-orientation={orientation || "horizontal"}
  class={classes()}
/>