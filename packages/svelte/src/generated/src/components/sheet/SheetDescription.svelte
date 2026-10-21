<script context="module" lang="ts">
  export interface SheetDescriptionProps {
    className?: string;
    id?: string;
    children?: any;
  }

  // Pass the same `id` to the Sheet as `aria-describedby`.
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { sheetDescriptionVariants } from "./sheet.styles.ts";

  export let className: SheetDescriptionProps["className"] = undefined;
  export let id: SheetDescriptionProps["id"] = undefined;

  $: classes = () => {
    return cn(sheetDescriptionVariants(), className);
  };
</script>

<p {id} class={classes()}><slot /></p>