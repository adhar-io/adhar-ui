<script context="module" lang="ts">
  export interface AlertTitleProps {
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { alertTitleVariants } from "./alert.styles.ts";

  export let className: AlertTitleProps["className"] = undefined;
  export let id: AlertTitleProps["id"] = undefined;

  $: classes = () => {
    return cn(alertTitleVariants(), className);
  };
</script>

<h5 {id} class={classes()}><slot /></h5>