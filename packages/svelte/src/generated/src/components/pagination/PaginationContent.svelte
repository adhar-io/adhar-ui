<script context="module" lang="ts">
  export interface PaginationContentProps {
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { paginationContentVariants } from "./pagination.styles.ts";

  export let className: PaginationContentProps["className"] = undefined;
  export let id: PaginationContentProps["id"] = undefined;

  $: classes = () => {
    return cn(paginationContentVariants(), className);
  };
</script>

<ul {id} class={classes()}><slot /></ul>