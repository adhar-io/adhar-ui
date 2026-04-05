// @ts-nocheck
<script context="module" lang="ts">
  export interface AccordionTriggerProps {
    open?: boolean;
    className?: string;
    onClick?: () => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let open: AccordionTriggerProps["open"];
  export let onClick: AccordionTriggerProps["onClick"];
  export let className: AccordionTriggerProps["className"];

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

<button
  type="button"
  aria-expanded={open}
  on:click={(event) => {
    onClick?.();
  }}
  class={className}
  ><slot /><svg
    style={stringifyStyles({
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s",
    })}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg
  ></button
>