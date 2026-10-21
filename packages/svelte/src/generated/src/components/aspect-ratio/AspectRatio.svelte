<script context="module" lang="ts">
  export interface AspectRatioProps {
    /** Width / height. A number (16 / 9) or a CSS value ("16 / 9"). Default 16 / 9. */
    ratio?: number | string;
    className?: string;
    children?: any;
  }

  // Constrains its child to a fixed aspect ratio using the native CSS property.
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { aspectRatioVariants } from "./aspect-ratio.styles.ts";

  export let className: AspectRatioProps["className"] = undefined;
  export let ratio: AspectRatioProps["ratio"] = undefined;

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
    return cn(aspectRatioVariants(), className);
  };
  $: ratioValue = () => {
    return ratio === undefined || ratio === null ? "16 / 9" : String(ratio);
  };
</script>

<div
  style={stringifyStyles({
    aspectRatio: ratioValue(),
  })}
  class={classes()}
>
  <slot />
</div>