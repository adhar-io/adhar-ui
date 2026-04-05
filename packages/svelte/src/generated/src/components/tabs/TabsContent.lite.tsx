// @ts-nocheck
<script context="module" lang="ts">
  export interface TabsContentProps {
    value: string;
    active?: boolean;
    className?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let value: TabsContentProps["value"];
  export let active: TabsContentProps["active"];
  export let className: TabsContentProps["className"];
</script>

<div
  role="tabpanel"
  data-value={value}
  hidden={!active}
  tabIndex={0}
  class={className}
>
  {#if active}
    <slot />
  {/if}
</div>