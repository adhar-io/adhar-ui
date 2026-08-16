// @ts-nocheck
<script context="module" lang="ts">
  export interface PaginationPreviousProps {
    href?: string;
    disabled?: boolean;
    className?: string;
    /** Visible label (default "Previous") */
    label?: string;
    "aria-label"?: string;
    onClick?: (event: any) => void;
  }
</script>

<script lang="ts">
  export let href: PaginationPreviousProps["href"];
  export let disabled: PaginationPreviousProps["disabled"];
  export let onClick: PaginationPreviousProps["onClick"];
  export let className: PaginationPreviousProps["className"];
  export let label: PaginationPreviousProps["label"];
</script>

<a
  {href}
  aria-label={"aria-label" || "Go to previous page"}
  aria-disabled={disabled ? true : false}
  on:click={(event) => {
    onClick?.(event);
  }}
  class={className}
  ><svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg
  ><span>{label || "Previous"}</span></a
>