<script context="module" lang="ts">
  export interface SkeletonProps {
    /** Preset shape: text line, heading, avatar circle, button, card, or image */
    variant?:
      | "default"
      | "text"
      | "heading"
      | "avatar"
      | "button"
      | "card"
      | "image";
    className?: string;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { skeletonVariants } from "./skeleton.styles.ts";

  export let variant: SkeletonProps["variant"] = undefined;
  export let className: SkeletonProps["className"] = undefined;

  $: classes = () => {
    return cn(
      skeletonVariants({
        variant: variant,
      }),
      "motion-reduce:animate-none",
      className
    );
  };
</script>

<div aria-hidden="true" class={classes()} />