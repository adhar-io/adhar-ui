<script context="module" lang="ts">
  export interface SheetTitleProps {
    className?: string;
    id?: string;
    children?: any;
  }

  // Pass the same `id` to the Sheet as `aria-labelledby` so it is announced on open.
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { sheetTitleVariants } from "./sheet.styles.ts";

  export let className: SheetTitleProps["className"] = undefined;
  export let id: SheetTitleProps["id"] = undefined;

  $: classes = () => {
    return cn(sheetTitleVariants(), className);
  };
</script>

<h2 {id} class={classes()}><slot /></h2>