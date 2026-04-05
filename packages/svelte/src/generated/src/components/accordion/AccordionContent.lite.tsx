// @ts-nocheck
<script context="module" lang="ts">
  export interface AccordionContentProps {
    open?: boolean;
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let open: AccordionContentProps["open"];
  export let className: AccordionContentProps["className"];

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
    overflow: "hidden",
    transition: "height 0.2s ease-out",
  })}
  role="region"
  hidden={!open}
  class={className}
>
  <div><slot /></div>
</div>