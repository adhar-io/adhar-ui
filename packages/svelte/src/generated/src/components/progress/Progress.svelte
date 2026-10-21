<script context="module" lang="ts">
  export interface ProgressProps {
    /** Current value. Omit (or pass null) for an indeterminate, busy bar. */
    value?: number | null;
    max?: number;
    size?: "sm" | "default" | "lg";
    className?: string;
    indicatorClass?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    /** Human-readable value, e.g. "3 of 10 files" (defaults to the percentage) */
    "aria-valuetext"?: string;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import {
    progressIndicatorVariants,
    progressVariants,
  } from "./progress.styles.ts";
  import { clamp } from "../_internal/dom.ts";

  export let value: ProgressProps["value"] = undefined;
  export let max: ProgressProps["max"] = undefined;
  export let size: ProgressProps["size"] = undefined;
  export let className: ProgressProps["className"] = undefined;
  export let indicatorClass: ProgressProps["indicatorClass"] = undefined;
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

  $: isIndeterminate = () => {
    return value === undefined || value === null;
  };
  $: maxValue = () => {
    return max && max > 0 ? max : 100;
  };
  $: percent = () => {
    if (isIndeterminate()) return 0;
    return clamp(((value as number) / maxValue()) * 100, 0, 100);
  };
  $: classes = () => {
    return cn(
      progressVariants({
        size: size,
      }),
      className
    );
  };
  $: indicatorClasses = () => {
    return cn(
      progressIndicatorVariants(),
      isIndeterminate() ? "animate-pulse motion-reduce:animate-none" : "",
      indicatorClass
    );
  };
  $: indicatorTransform = () => {
    return isIndeterminate()
      ? "translateX(0)"
      : "translateX(-" + (100 - percent()) + "%)";
  };
  $: percentText = () => {
    return isIndeterminate() ? undefined : Math.round(percent()) + "%";
  };
</script>

<div
  role="progressbar"
  aria-valuenow={isIndeterminate() ? undefined : value}
  aria-valuemin={0}
  aria-valuemax={maxValue()}
  aria-valuetext={"aria-valuetext" || percentText()}
  aria-busy={isIndeterminate() ? true : undefined}
  aria-label={"aria-labelledby" ? undefined : "aria-label" || "Progress"}
  aria-labelledby={"aria-labelledby"}
  data-state={isIndeterminate()
    ? "indeterminate"
    : percent() >= 100
    ? "complete"
    : "loading"}
  class={classes()}
>
  <div
    style={stringifyStyles({
      transform: indicatorTransform(),
    })}
    class={indicatorClasses()}
  />
</div>