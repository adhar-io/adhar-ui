<script context="module" lang="ts">
  export interface BreadcrumbLinkProps {
    href?: string;
    target?: string;
    rel?: string;
    className?: string;
    /** Use for client-side routing; call event.preventDefault() to stop the native navigation */
    onClick?: (event: any) => void;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { breadcrumbLinkVariants } from "./breadcrumb.styles.ts";

  export let className: BreadcrumbLinkProps["className"] = undefined;
  export let href: BreadcrumbLinkProps["href"] = undefined;
  export let target: BreadcrumbLinkProps["target"] = undefined;
  export let rel: BreadcrumbLinkProps["rel"] = undefined;
  export let onClick: BreadcrumbLinkProps["onClick"] = undefined;

  $: classes = () => {
    return cn(breadcrumbLinkVariants(), className);
  };
</script>

<a
  {href}
  {target}
  {rel}
  on:click={(event) => {
    onClick?.(event);
  }}
  class={classes()}><slot /></a
>