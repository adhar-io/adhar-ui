<script context="module" lang="ts">
  export interface BadgeProps {
    variant?:
      | "default"
      | "secondary"
      | "destructive"
      | "outline"
      | "success"
      | "warning"
      | "info";
    size?: "sm" | "default" | "lg";
    className?: string;
    id?: string;
    title?: string;
    /** Renders a small leading status dot inheriting the badge’s text color */
    dot?: boolean;
    /** Extra classes for the leading dot (e.g. a fixed color) */
    dotClass?: string;
    /**
     * ARIA role. Only set "status" for live, dynamic counters (e.g. unread
     * counts) so screen readers announce changes. Static labels need no role.
     * Defaults to "button" when `onClick` is set.
     */
    role?: string;
    "aria-label"?: string;
    /** Makes the badge interactive: focusable, and activated by Enter / Space */
    onClick?: (event: any) => void;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { badgeVariants } from "./badge.styles.ts";

  export let variant: BadgeProps["variant"] = undefined;
  export let size: BadgeProps["size"] = undefined;
  export let onClick: BadgeProps["onClick"] = undefined;
  export let className: BadgeProps["className"] = undefined;
  export let dotClass: BadgeProps["dotClass"] = undefined;
  export let id: BadgeProps["id"] = undefined;
  export let title: BadgeProps["title"] = undefined;
  export let role: BadgeProps["role"] = undefined;
  export let dot: BadgeProps["dot"] = undefined;

  function handleKeyDown(event: any) {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick(event);
    }
  }
  $: classes = () => {
    return cn(
      badgeVariants({
        variant: variant,
        size: size,
      }),
      onClick ? "cursor-pointer" : "",
      className
    );
  };
  $: dotClasses = () => {
    return cn(
      "mr-1 inline-block size-1.5 shrink-0 rounded-full bg-current opacity-70",
      dotClass
    );
  };
</script>

<span
  {id}
  {title}
  role={role || (onClick ? "button" : undefined)}
  tabIndex={onClick ? 0 : undefined}
  aria-label={"aria-label"}
  on:click={(event) => {
    onClick?.(event);
  }}
  on:keydown={(event) => {
    handleKeyDown(event);
  }}
  class={classes()}
>
  {#if dot}
    <span aria-hidden="true" class={dotClasses()} />
  {/if}<slot /></span
>