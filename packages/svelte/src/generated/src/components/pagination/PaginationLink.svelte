<script context="module" lang="ts">
  export interface PaginationLinkProps {
    href?: string;
    /** Marks this link as the current page (sets aria-current="page") */
    isActive?: boolean;
    /** Removes the link from navigation and the tab order */
    disabled?: boolean;
    size?: "sm" | "default" | "lg";
    className?: string;
    "aria-label"?: string;
    /** Use for client-side paging; not called while disabled */
    onClick?: (event: any) => void;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { paginationLinkVariants } from "./pagination.styles.ts";

  export let isActive: PaginationLinkProps["isActive"] = undefined;
  export let size: PaginationLinkProps["size"] = undefined;
  export let className: PaginationLinkProps["className"] = undefined;
  export let disabled: PaginationLinkProps["disabled"] = undefined;
  export let onClick: PaginationLinkProps["onClick"] = undefined;
  export let href: PaginationLinkProps["href"] = undefined;

  function handleClick(event: any) {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  }
  $: classes = () => {
    return cn(
      paginationLinkVariants({
        isActive: !!isActive,
        size: size,
      }),
      className
    );
  };
</script>

<a
  href={disabled ? undefined : href}
  role={href && !disabled ? undefined : "link"}
  tabIndex={disabled ? -1 : href ? undefined : 0}
  aria-current={isActive ? "page" : undefined}
  aria-disabled={disabled ? true : undefined}
  aria-label={"aria-label"}
  on:click={(event) => {
    handleClick(event);
  }}
  on:keydown={(event) => {
    if (!href && event.key === "Enter") handleClick(event);
  }}
  class={classes()}><slot /></a
>