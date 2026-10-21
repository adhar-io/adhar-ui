<script context="module" lang="ts">
  export interface DialogTitleProps {
    className?: string;
    id?: string;
    children?: any;
  }

  // Pass the same `id` to the Dialog as `aria-labelledby` so it is announced on open.
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { dialogTitleVariants } from "./dialog.styles.ts";

  export let className: DialogTitleProps["className"] = undefined;
  export let id: DialogTitleProps["id"] = undefined;

  $: classes = () => {
    return cn(dialogTitleVariants(), className);
  };
</script>

<h2 {id} class={classes()}><slot /></h2>