<script context="module" lang="ts">
  export interface TabsContentProps {
    value: string;
    active?: boolean;
    /** Keep inactive panels mounted (hidden) to preserve their state */
    forceMount?: boolean;
    className?: string;
    id?: string;
    /** ID of the TabsTrigger that labels this panel */
    "aria-labelledby"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { tabsContentVariants } from "./tabs.styles.ts";

  export let className: TabsContentProps["className"] = undefined;
  export let id: TabsContentProps["id"] = undefined;
  export let value: TabsContentProps["value"];
  export let active: TabsContentProps["active"] = undefined;
  export let forceMount: TabsContentProps["forceMount"] = undefined;

  $: classes = () => {
    return cn(tabsContentVariants(), className);
  };
</script>

<div
  role="tabpanel"
  {id}
  aria-labelledby={"aria-labelledby"}
  data-value={value}
  data-state={active ? "active" : "inactive"}
  hidden={!active}
  tabIndex={0}
  class={classes()}
>
  {#if active || forceMount}
    <slot />
  {/if}
</div>