<script context="module" lang="ts">
  export interface ToggleGroupItemProps {
    /** The value this item represents within its group */
    value: string;
    /** Whether this item is currently pressed/on */
    pressed?: boolean;
    disabled?: boolean;
    variant?: "default" | "outline";
    size?: "sm" | "default" | "lg";
    className?: string;
    id?: string;
    title?: string;
    "aria-label"?: string;
    /** Fired with this item’s value when activated */
    onToggle?: (value: string) => void;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { toggleVariants } from "../toggle/toggle.styles.ts";

  export let variant: ToggleGroupItemProps["variant"] = undefined;
  export let size: ToggleGroupItemProps["size"] = undefined;
  export let className: ToggleGroupItemProps["className"] = undefined;
  export let id: ToggleGroupItemProps["id"] = undefined;
  export let title: ToggleGroupItemProps["title"] = undefined;
  export let value: ToggleGroupItemProps["value"];
  export let pressed: ToggleGroupItemProps["pressed"] = undefined;
  export let disabled: ToggleGroupItemProps["disabled"] = undefined;
  export let onToggle: ToggleGroupItemProps["onToggle"] = undefined;

  $: classes = () => {
    return cn(
      toggleVariants({
        variant: variant,
        size: size,
      }),
      className
    );
  };
</script>

<button
  type="button"
  {id}
  {title}
  {value}
  aria-pressed={pressed ? true : false}
  aria-label={"aria-label"}
  data-state={pressed ? "on" : "off"}
  {disabled}
  on:click={(event) => {
    disabled ? undefined : onToggle?.(value);
  }}
  class={classes()}><slot /></button
>