<script context="module" lang="ts">
  export interface PaginationProps {
    className?: string;
    "aria-label"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { paginationVariants } from "./pagination.styles.ts";

  export let className: PaginationProps["className"] = undefined;

  $: classes = () => {
    return cn(paginationVariants(), className);
  };
</script>

<nav aria-label={"aria-label" || "Pagination"} class={classes()}><slot /></nav>