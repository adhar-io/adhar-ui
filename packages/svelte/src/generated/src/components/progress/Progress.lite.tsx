// @ts-nocheck
<script context="module" lang="ts">
  export interface ProgressProps {
    value?: number;
    max?: number;
    className?: string;
    indicatorClass?: string;
    "aria-label"?: string;
  }
</script>

<script lang="ts">
  export let value: ProgressProps["value"];
  export let max: ProgressProps["max"];
  export let className: ProgressProps["className"];
  export let indicatorClass: ProgressProps["indicatorClass"];
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
</script>

<div
  role="progressbar"
  aria-valuenow={value || 0}
  aria-valuemin={0}
  aria-valuemax={max || 100}
  aria-label={"aria-label" || "Progress"}
  class={className}
>
  <div
    style={stringifyStyles({
      transform: `translateX(-${100 - (value || 0)}%)`,
    })}
    class={indicatorClass}
  />
</div>