<script context="module" lang="ts">
  export interface AlertDescriptionProps {
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { alertDescriptionVariants } from "./alert.styles.ts";

  export let className: AlertDescriptionProps["className"] = undefined;
  export let id: AlertDescriptionProps["id"] = undefined;

  $: classes = () => {
    return cn(alertDescriptionVariants(), className);
  };
</script>

<div {id} class={classes()}><slot /></div>