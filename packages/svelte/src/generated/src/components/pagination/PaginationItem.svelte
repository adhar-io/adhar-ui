<script context="module" lang="ts">
  export interface PaginationItemProps {
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { paginationItemVariants } from "./pagination.styles.ts";

  export let className: PaginationItemProps["className"] = undefined;
  export let id: PaginationItemProps["id"] = undefined;

  $: classes = () => {
    return cn(paginationItemVariants(), className);
  };
</script>

<li {id} class={classes()}><slot /></li>