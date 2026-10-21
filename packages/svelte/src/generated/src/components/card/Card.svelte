<script context="module" lang="ts">
  export interface CardProps {
    /** Inner padding. Use ’none’ (default) with CardHeader / CardContent / CardFooter. */
    padding?: "none" | "sm" | "default" | "lg";
    /**
     * Hover / focus affordance for clickable cards. With `onClick` the card is
     * also focusable and activated by Enter / Space.
     */
    interactive?: boolean;
    className?: string;
    id?: string;
    role?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    onClick?: (event: any) => void;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { cardVariants } from "./card.styles.ts";

  export let interactive: CardProps["interactive"] = undefined;
  export let onClick: CardProps["onClick"] = undefined;
  export let padding: CardProps["padding"] = undefined;
  export let className: CardProps["className"] = undefined;
  export let id: CardProps["id"] = undefined;
  export let role: CardProps["role"] = undefined;

  function handleKeyDown(event: any) {
    if (
      onClick &&
      event.target === event.currentTarget &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      onClick(event);
    }
  }
  $: isInteractive = () => {
    return !!interactive || !!onClick;
  };
  $: classes = () => {
    return cn(
      cardVariants({
        padding: padding,
        interactive: isInteractive(),
      }),
      className
    );
  };
</script>

<div
  {id}
  role={role || (onClick ? "button" : undefined)}
  tabIndex={onClick ? 0 : undefined}
  aria-label={"aria-label"}
  aria-labelledby={"aria-labelledby"}
  on:click={(event) => {
    onClick?.(event);
  }}
  on:keydown={(event) => {
    handleKeyDown(event);
  }}
  class={classes()}
>
  <slot />
</div>