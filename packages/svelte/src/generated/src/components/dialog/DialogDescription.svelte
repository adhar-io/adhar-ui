<script context="module" lang="ts">
  export interface DialogDescriptionProps {
    className?: string;
    id?: string;
    children?: any;
  }

  // Pass the same `id` to the Dialog as `aria-describedby`.
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { dialogDescriptionVariants } from "./dialog.styles.ts";

  export let className: DialogDescriptionProps["className"] = undefined;
  export let id: DialogDescriptionProps["id"] = undefined;

  $: classes = () => {
    return cn(dialogDescriptionVariants(), className);
  };
</script>

<p {id} class={classes()}><slot /></p>