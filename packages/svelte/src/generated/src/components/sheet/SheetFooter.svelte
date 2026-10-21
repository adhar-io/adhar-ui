<script context="module" lang="ts">
  export interface SheetFooterProps {
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { sheetFooterVariants } from "./sheet.styles.ts";

  export let className: SheetFooterProps["className"] = undefined;
  export let id: SheetFooterProps["id"] = undefined;

  $: classes = () => {
    return cn(sheetFooterVariants(), className);
  };
</script>

<div {id} class={classes()}><slot /></div>