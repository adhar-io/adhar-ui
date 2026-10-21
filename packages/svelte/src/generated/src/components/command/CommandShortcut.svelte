<script context="module" lang="ts">
  export interface CommandShortcutProps {
    className?: string;
    "aria-label"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { commandShortcutVariants } from "./command.styles.ts";

  export let className: CommandShortcutProps["className"] = undefined;

  $: classes = () => {
    return cn(commandShortcutVariants(), className);
  };
</script>

<span aria-label={"aria-label"} class={classes()}><slot /></span>