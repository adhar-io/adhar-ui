// @ts-nocheck
<script context="module" lang="ts">
  export interface AspectRatioProps {
    /** CSS aspect-ratio value, e.g. "16 / 9", "1 / 1", "4 / 3" (default "16 / 9") */
    ratio?: string;
    className?: string;
    children?: any;
  }

  // Constrains its child to a fixed aspect ratio using the native CSS property.
</script>

<script lang="ts">
  export let ratio: AspectRatioProps["ratio"];
  export let className: AspectRatioProps["className"];

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
  style={stringifyStyles({
    aspectRatio: ratio || "16 / 9",
  })}
  class={className}
>
  <slot />
</div>