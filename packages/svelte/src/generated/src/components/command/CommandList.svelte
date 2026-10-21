<script context="module" lang="ts">
  export interface CommandListProps {
    id?: string;
    className?: string;
    "aria-label"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { commandListVariants } from "./command.styles.ts";

  export let className: CommandListProps["className"] = undefined;
  export let id: CommandListProps["id"] = undefined;

  $: classes = () => {
    return cn(commandListVariants(), className);
  };
</script>

<div
  role="listbox"
  {id}
  aria-label={"aria-label" || "Suggestions"}
  class={classes()}
>
  <slot />
</div>