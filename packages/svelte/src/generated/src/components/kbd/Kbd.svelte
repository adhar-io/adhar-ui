<script context="module" lang="ts">
  export interface KbdProps {
    size?: "sm" | "default" | "lg";
    className?: string;
    /** Spoken label for the key when the glyph is not descriptive (e.g. "⌘" → "Command") */
    "aria-label"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { kbdVariants } from "./kbd.styles.ts";

  export let size: KbdProps["size"] = undefined;
  export let className: KbdProps["className"] = undefined;

  $: classes = () => {
    return cn(
      kbdVariants({
        size: size,
      }),
      className
    );
  };
</script>

<kbd aria-label={"aria-label"} class={classes()}><slot /></kbd>