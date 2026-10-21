<script context="module" lang="ts">
  export interface TabsTriggerProps {
    value: string;
    active?: boolean;
    disabled?: boolean;
    className?: string;
    /** Give the trigger an id and pass it to TabsContent `aria-labelledby` */
    id?: string;
    /** ID of the TabsContent this trigger shows */
    "aria-controls"?: string;
    onClick?: (value: string) => void;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { tabsTriggerVariants } from "./tabs.styles.ts";

  export let className: TabsTriggerProps["className"] = undefined;
  export let id: TabsTriggerProps["id"] = undefined;
  export let active: TabsTriggerProps["active"] = undefined;
  export let disabled: TabsTriggerProps["disabled"] = undefined;
  export let value: TabsTriggerProps["value"];
  export let onClick: TabsTriggerProps["onClick"] = undefined;

  $: classes = () => {
    return cn(tabsTriggerVariants(), className);
  };
</script>

<button
  type="button"
  role="tab"
  {id}
  aria-selected={active ? true : false}
  aria-controls={"aria-controls"}
  {disabled}
  tabIndex={active ? 0 : -1}
  data-value={value}
  data-state={active ? "active" : "inactive"}
  on:click={(event) => {
    onClick?.(value);
  }}
  class={classes()}><slot /></button
>