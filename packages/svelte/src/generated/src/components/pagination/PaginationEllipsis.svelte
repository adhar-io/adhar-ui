<script context="module" lang="ts">
  export interface PaginationEllipsisProps {
    className?: string;
    /** Screen-reader label (default "More pages") */
    label?: string;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { paginationEllipsisVariants } from "./pagination.styles.ts";

  export let className: PaginationEllipsisProps["className"] = undefined;
  export let label: PaginationEllipsisProps["label"] = undefined;

  $: classes = () => {
    return cn(paginationEllipsisVariants(), className);
  };
</script>

<span class={classes()}
  ><svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    ><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle
      cx="5"
      cy="12"
      r="1"
    /></svg
  ><span class="sr-only">{label || "More pages"}</span></span
>