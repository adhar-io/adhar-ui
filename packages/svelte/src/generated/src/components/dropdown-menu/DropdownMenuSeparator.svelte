<script context="module" lang="ts">
  export interface DropdownMenuSeparatorProps {
    className?: string;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { dropdownMenuSeparatorVariants } from "./dropdown-menu.styles.ts";

  export let className: DropdownMenuSeparatorProps["className"] = undefined;

  $: classes = () => {
    return cn(dropdownMenuSeparatorVariants(), className);
  };
</script>

<div role="separator" class={classes()} />