<script context="module" lang="ts">
  export interface SheetHeaderProps {
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { sheetHeaderVariants } from "./sheet.styles.ts";

  export let className: SheetHeaderProps["className"] = undefined;
  export let id: SheetHeaderProps["id"] = undefined;

  $: classes = () => {
    return cn(sheetHeaderVariants(), className);
  };
</script>

<div {id} class={classes()}><slot /></div>