// @ts-nocheck
<script context="module" lang="ts">
  export interface BreadcrumbLinkProps {
    href?: string;
    className?: string;
    onClick?: (event: any) => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let href: BreadcrumbLinkProps["href"];
  export let onClick: BreadcrumbLinkProps["onClick"];
  export let className: BreadcrumbLinkProps["className"];
</script>

<a
  {href}
  on:click={(event) => {
    onClick?.(event);
  }}
  class={className}><slot /></a
>