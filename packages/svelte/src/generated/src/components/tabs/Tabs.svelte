<script context="module" lang="ts">
  export interface TabsProps {
    /** The active tab’s value */
    value?: string;
    /** @deprecated Pass `value`; kept for data-active-tab on first render */
    defaultValue?: string;
    orientation?: "horizontal" | "vertical";
    className?: string;
    id?: string;
    /**
     * Fires with a tab’s value when the user activates it (click, or arrow keys
     * in TabsList). Lets the root own selection instead of every trigger’s onClick.
     */
    onValueChange?: (value: string) => void;
    /** Alias of `onValueChange` */
    onChange?: (value: string) => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let value: TabsProps["value"] = undefined;
  export let defaultValue: TabsProps["defaultValue"] = undefined;
  export let onValueChange: TabsProps["onValueChange"] = undefined;
  export let onChange: TabsProps["onChange"] = undefined;
  export let id: TabsProps["id"] = undefined;
  export let orientation: TabsProps["orientation"] = undefined;
  export let className: TabsProps["className"] = undefined;

  function handleClick(event: any) {
    const tab = event.target.closest
      ? event.target.closest('[role="tab"]')
      : null;
    if (!tab || tab.disabled || !rootRef || !rootRef.contains(tab)) return;
    /* Ignore tabs that belong to a nested Tabs. */
    if (tab.closest("[data-adhar-tabs]") !== rootRef) return;
    const value = tab.getAttribute("data-value") || "";
    if (value === activeTab()) return;
    onValueChange?.(value);
    onChange?.(value);
  }
  $: activeTab = () => {
    return value || defaultValue || "";
  };

  let rootRef;
</script>

<div
  data-adhar-tabs=""
  bind:this={rootRef}
  {id}
  data-active-tab={activeTab()}
  data-orientation={orientation || "horizontal"}
  on:click={(event) => {
    handleClick(event);
  }}
  class={className}
>
  <slot />
</div>