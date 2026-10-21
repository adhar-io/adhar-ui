<script context="module" lang="ts">
  export interface DialogHeaderProps {
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { dialogHeaderVariants } from "./dialog.styles.ts";

  export let className: DialogHeaderProps["className"] = undefined;
  export let id: DialogHeaderProps["id"] = undefined;

  $: classes = () => {
    return cn(dialogHeaderVariants(), className);
  };
</script>

<div {id} class={classes()}><slot /></div>