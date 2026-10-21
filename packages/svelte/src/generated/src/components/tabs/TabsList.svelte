<script context="module" lang="ts">
  export interface TabsListProps {
    orientation?: "horizontal" | "vertical";
    /** Stretch the list and its triggers to the container width */
    fullWidth?: boolean;
    /**
     * ’automatic’ (default) selects a tab as soon as arrow keys focus it;
     * ’manual’ only moves focus — Enter / Space selects.
     */
    activationMode?: "automatic" | "manual";
    /** Wrap arrow-key navigation from last to first tab (default true) */
    loop?: boolean;
    className?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { tabsListVariants } from "./tabs.styles.ts";
  import { rovingFocus } from "../_internal/dom.ts";

  export let orientation: TabsListProps["orientation"] = undefined;
  export let fullWidth: TabsListProps["fullWidth"] = undefined;
  export let className: TabsListProps["className"] = undefined;
  export let loop: TabsListProps["loop"] = undefined;
  export let activationMode: TabsListProps["activationMode"] = undefined;

  function handleKeyDown(event: any) {
    rovingFocus(event, listRef, '[role="tab"]', {
      orientation: orientation === "vertical" ? "vertical" : "horizontal",
      loop: loop !== false,
      activate: activationMode !== "manual",
    });
  }
  $: classes = () => {
    return cn(
      tabsListVariants({
        orientation: orientation,
        fullWidth: !!fullWidth,
      }),
      className
    );
  };

  let listRef;
</script>

<div
  role="tablist"
  bind:this={listRef}
  aria-orientation={orientation || "horizontal"}
  aria-label={"aria-label"}
  aria-labelledby={"aria-labelledby"}
  on:keydown={(event) => {
    handleKeyDown(event);
  }}
  class={classes()}
>
  <slot />
</div>