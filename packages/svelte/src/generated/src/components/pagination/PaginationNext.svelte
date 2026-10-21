<script context="module" lang="ts">
  export interface PaginationNextProps {
    href?: string;
    /** Removes the link from navigation and the tab order (e.g. on the last page) */
    disabled?: boolean;
    size?: "sm" | "default" | "lg";
    className?: string;
    /** Visible label (default "Next") */
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

  export let size: PaginationNextProps["size"] = undefined;
  export let iconOnly: PaginationNextProps["iconOnly"] = undefined;
  export let className: PaginationNextProps["className"] = undefined;
  export let disabled: PaginationNextProps["disabled"] = undefined;
  export let onClick: PaginationNextProps["onClick"] = undefined;
  export let href: PaginationNextProps["href"] = undefined;
  export let label: PaginationNextProps["label"] = undefined;

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
      iconOnly ? "" : "gap-1 pr-2.5",
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
  aria-label={"aria-label" || "Go to next page"}
  aria-disabled={disabled ? true : undefined}
  on:click={(event) => {
    handleClick(event);
  }}
  on:keydown={(event) => {
    if (!href && event.key === "Enter") handleClick(event);
  }}
  class={classes()}
  ><span class={labelClasses()}>{label || "Next"}</span><svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg
  ></a
>