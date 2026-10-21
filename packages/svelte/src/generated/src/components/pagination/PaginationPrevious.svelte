<script context="module" lang="ts">
  export interface PaginationPreviousProps {
    href?: string;
    /** Removes the link from navigation and the tab order (e.g. on the first page) */
    disabled?: boolean;
    size?: "sm" | "default" | "lg";
    className?: string;
    /** Visible label (default "Previous") */
    label?: string;
    /** Show only the chevron; the label stays available to screen readers */
    iconOnly?: boolean;
    "aria-label"?: string;
    onClick?: (event: any) => void;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { paginationLinkVariants } from "./pagination.styles.ts";

  export let size: PaginationPreviousProps["size"] = undefined;
  export let iconOnly: PaginationPreviousProps["iconOnly"] = undefined;
  export let className: PaginationPreviousProps["className"] = undefined;
  export let disabled: PaginationPreviousProps["disabled"] = undefined;
  export let onClick: PaginationPreviousProps["onClick"] = undefined;
  export let href: PaginationPreviousProps["href"] = undefined;
  export let label: PaginationPreviousProps["label"] = undefined;

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
        isActive: false,
        size: size,
      }),
      iconOnly ? "" : "gap-1 pl-2.5",
      className
    );
  };
  $: labelClasses = () => {
    return iconOnly ? "sr-only" : "hidden sm:inline";
  };
</script>

<a
  href={disabled ? undefined : href}
  role={href && !disabled ? undefined : "link"}
  tabIndex={disabled ? -1 : href ? undefined : 0}
  aria-label={"aria-label" || "Go to previous page"}
  aria-disabled={disabled ? true : undefined}
  on:click={(event) => {
    handleClick(event);
  }}
  on:keydown={(event) => {
    if (!href && event.key === "Enter") handleClick(event);
  }}
  class={classes()}
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
    aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg
  ><span class={labelClasses()}>{label || "Previous"}</span></a
>