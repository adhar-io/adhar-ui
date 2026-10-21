<script context="module" lang="ts">
  export interface CommandItemProps {
    /** The value this item represents (passed to onSelect / onHighlightChange) */
    value?: string;
    /** Whether this item is the active/highlighted option */
    selected?: boolean;
    disabled?: boolean;
    /** Set an id to reference it from CommandInput `aria-activedescendant` */
    id?: string;
    className?: string;
    onSelect?: (value: string) => void;
    /** Fires on pointer hover, so mouse and keyboard share one highlight */
    onHighlight?: (value: string) => void;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { commandItemVariants } from "./command.styles.ts";

  export let className: CommandItemProps["className"] = undefined;
  export let id: CommandItemProps["id"] = undefined;
  export let selected: CommandItemProps["selected"] = undefined;
  export let disabled: CommandItemProps["disabled"] = undefined;
  export let value: CommandItemProps["value"] = undefined;
  export let onSelect: CommandItemProps["onSelect"] = undefined;
  export let onHighlight: CommandItemProps["onHighlight"] = undefined;

  $: classes = () => {
    return cn(commandItemVariants(), className);
  };
</script>

<div
  role="option"
  {id}
  tabIndex={-1}
  aria-selected={selected ? true : false}
  aria-disabled={disabled ? true : undefined}
  data-selected={selected ? "true" : "false"}
  data-disabled={disabled ? "" : undefined}
  data-value={value}
  on:click={(event) => {
    disabled ? undefined : onSelect?.(value || "");
  }}
  on:mouseenter={(event) => {
    disabled ? undefined : onHighlight?.(value || "");
  }}
  class={classes()}
>
  <slot />
</div>