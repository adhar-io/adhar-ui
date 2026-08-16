// @ts-nocheck
<script context="module" lang="ts">
  export interface PaginationNextProps {
    href?: string;
    disabled?: boolean;
    className?: string;
    /** Visible label (default "Next") */
    label?: string;
    "aria-label"?: string;
    onClick?: (event: any) => void;
  }
</script>

<script lang="ts">
  export let href: PaginationNextProps["href"];
  export let disabled: PaginationNextProps["disabled"];
  export let onClick: PaginationNextProps["onClick"];
  export let className: PaginationNextProps["className"];
  export let label: PaginationNextProps["label"];
</script>

<a
  {href}
  aria-label={"aria-label" || "Go to next page"}
  aria-disabled={disabled ? true : false}
  on:click={(event) => {
    onClick?.(event);
  }}
  class={className}
  ><span>{label || "Next"}</span><svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg
  ></a
>