// @ts-nocheck
<script context="module" lang="ts">
  export interface PaginationEllipsisProps {
    className?: string;
    /** Screen-reader label (default "More pages") */
    label?: string;
  }
</script>

<script lang="ts">
  export let className: PaginationEllipsisProps["className"];
  export let label: PaginationEllipsisProps["label"];
</script>

<span aria-hidden="true" class={className}
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
    ><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle
      cx="5"
      cy="12"
      r="1"
    /></svg
  ><span class="sr-only">{label || "More pages"}</span></span
>