<script context="module" lang="ts">
  export interface CommandSeparatorProps {
    className?: string;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { commandSeparatorVariants } from "./command.styles.ts";

  export let className: CommandSeparatorProps["className"] = undefined;

  $: classes = () => {
    return cn(commandSeparatorVariants(), className);
  };
</script>

<div role="separator" aria-orientation="horizontal" class={classes()} />