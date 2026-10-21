<script context="module" lang="ts">
  export interface ScrollAreaProps {
    orientation?: "vertical" | "horizontal" | "both";
    /** Max height of the scroll viewport, e.g. "20rem" or 320 (px) */
    maxHeight?: string | number;
    className?: string;
    /** Adds tabindex so keyboard users can scroll the region. Requires `aria-label`. */
    focusable?: boolean;
    "aria-label"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { scrollAreaVariants } from "./scroll-area.styles.ts";

  export let orientation: ScrollAreaProps["orientation"] = undefined;
  export let focusable: ScrollAreaProps["focusable"] = undefined;
  export let className: ScrollAreaProps["className"] = undefined;
  export let maxHeight: ScrollAreaProps["maxHeight"] = undefined;

  function stringifyStyles(stylesObj) {
    let styles = "";
    for (let key in stylesObj) {
      const dashedKey = key.replace(/[A-Z]/g, function (match) {
        return "-" + match.toLowerCase();
      });
      styles += dashedKey + ":" + stylesObj[key] + ";";
    }
    return styles;
  }

  $: classes = () => {
    return cn(
      scrollAreaVariants({
        orientation: orientation,
      }),
      focusable
        ? "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        : "",
      className
    );
  };
  $: maxHeightValue = () => {
    if (maxHeight === undefined || maxHeight === null) return undefined;
    return typeof maxHeight === "number" ? maxHeight + "px" : maxHeight;
  };
</script>

<div
  style={stringifyStyles({
    maxHeight: maxHeightValue(),
  })}
  tabIndex={focusable ? 0 : undefined}
  role={focusable ? "region" : undefined}
  aria-label={"aria-label"}
  data-orientation={orientation || "vertical"}
  class={classes()}
>
  <slot />
</div>