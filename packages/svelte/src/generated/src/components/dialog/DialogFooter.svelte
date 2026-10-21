<script context="module" lang="ts">
  export interface DialogFooterProps {
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { dialogFooterVariants } from "./dialog.styles.ts";

  export let className: DialogFooterProps["className"] = undefined;
  export let id: DialogFooterProps["id"] = undefined;

  $: classes = () => {
    return cn(dialogFooterVariants(), className);
  };
</script>

<div {id} class={classes()}><slot /></div>