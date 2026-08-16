// @ts-nocheck
<script context="module" lang="ts">
  export interface PaginationLinkProps {
    href?: string;
    /** Marks this link as the current page (sets aria-current="page") */
    isActive?: boolean;
    disabled?: boolean;
    className?: string;
    "aria-label"?: string;
    onClick?: (event: any) => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let href: PaginationLinkProps["href"];
  export let isActive: PaginationLinkProps["isActive"];
  export let disabled: PaginationLinkProps["disabled"];
  export let onClick: PaginationLinkProps["onClick"];
  export let className: PaginationLinkProps["className"];
</script>

<a
  {href}
  aria-current={isActive ? "page" : undefined}
  aria-disabled={disabled ? true : false}
  aria-label={"aria-label"}
  on:click={(event) => {
    onClick?.(event);
  }}
  class={className}><slot /></a
>