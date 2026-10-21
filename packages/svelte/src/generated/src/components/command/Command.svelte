<script context="module" lang="ts">
  export interface CommandProps {
    className?: string;
    "aria-label"?: string;
    /** Wrap arrow-key navigation from last to first item (default true) */
    loop?: boolean;
    /**
     * Fires with the value of the item ArrowUp / ArrowDown / Home / End should
     * highlight. Store it and pass `selected` to the matching CommandItem; Enter
     * then selects the highlighted item.
     */
    onHighlightChange?: (value: string) => void;
    children?: any;
  }

  // Command menu / palette container. Filtering is driven by the consumer;
  // keyboard highlight is computed here from the rendered items.
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { commandVariants } from "./command.styles.ts";

  export let className: CommandProps["className"] = undefined;
  export let loop: CommandProps["loop"] = undefined;
  export let onHighlightChange: CommandProps["onHighlightChange"] = undefined;

  function getItems() {
    if (!rootRef) return [];
    return Array.from(rootRef.querySelectorAll('[role="option"]')).filter(
      (el: any) => el.getAttribute("aria-disabled") !== "true"
    ) as HTMLElement[];
  }
  function handleKeyDown(event: any) {
    const items = getItems();
    if (items.length === 0) return;
    const current = items.findIndex(
      (el) => el.getAttribute("aria-selected") === "true"
    );
    if (event.key === "Enter") {
      if (current >= 0) {
        event.preventDefault();
        items[current].click();
      }
      return;
    }
    let next = -1;
    const loop = loop !== false;
    if (event.key === "ArrowDown") {
      next =
        current + 1 >= items.length
          ? loop
            ? 0
            : items.length - 1
          : current + 1;
    } else if (event.key === "ArrowUp") {
      next = current <= 0 ? (loop ? items.length - 1 : 0) : current - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = items.length - 1;
    }
    if (next < 0) return;
    event.preventDefault();
    onHighlightChange?.(items[next].getAttribute("data-value") || "");
    items[next].scrollIntoView({
      block: "nearest",
    });
  }
  $: classes = () => {
    return cn(commandVariants(), className);
  };

  let rootRef;
</script>

<div
  bind:this={rootRef}
  aria-label={"aria-label" || "Command menu"}
  on:keydown={(event) => {
    handleKeyDown(event);
  }}
  class={classes()}
>
  <slot />
</div>