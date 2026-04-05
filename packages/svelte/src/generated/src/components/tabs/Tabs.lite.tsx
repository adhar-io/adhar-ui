// @ts-nocheck
<script context="module" lang="ts">
  export interface TabsProps {
    defaultValue?: string;
    value?: string;
    className?: string;
    onChange?: (value: string) => void;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: TabsProps["className"];
</script>

<div data-active-tab={state.activeTab} class={className}><slot /></div>