<script context="module" lang="ts">
  export interface CommandEmptyProps {
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { commandEmptyVariants } from "./command.styles.ts";

  export let className: CommandEmptyProps["className"] = undefined;

  $: classes = () => {
    return cn(commandEmptyVariants(), className);
  };
</script>

<div role="presentation" class={classes()}><slot /></div>