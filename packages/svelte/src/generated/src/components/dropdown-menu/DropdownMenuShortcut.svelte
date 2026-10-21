<script context="module" lang="ts">
  export interface DropdownMenuShortcutProps {
    className?: string;
    id?: string;
    children?: any;
  }

  // Keyboard shortcut hint shown at the end of a DropdownMenuItem.
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { dropdownMenuShortcutVariants } from "./dropdown-menu.styles.ts";

  export let className: DropdownMenuShortcutProps["className"] = undefined;
  export let id: DropdownMenuShortcutProps["id"] = undefined;

  $: classes = () => {
    return cn(dropdownMenuShortcutVariants(), className);
  };
</script>

<span aria-hidden="true" {id} class={classes()}><slot /></span>