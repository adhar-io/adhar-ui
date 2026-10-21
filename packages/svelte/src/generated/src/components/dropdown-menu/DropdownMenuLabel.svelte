<script context="module" lang="ts">
  export interface DropdownMenuLabelProps {
    className?: string;
    id?: string;
    children?: any;
  }

  // Non-interactive heading for a group of menu items.
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { dropdownMenuLabelVariants } from "./dropdown-menu.styles.ts";

  export let className: DropdownMenuLabelProps["className"] = undefined;
  export let id: DropdownMenuLabelProps["id"] = undefined;

  $: classes = () => {
    return cn(dropdownMenuLabelVariants(), className);
  };
</script>

<div role="presentation" {id} class={classes()}><slot /></div>