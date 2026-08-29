// @ts-nocheck
<script context="module" lang="ts">
  export interface CommandGroupProps {
    heading?: string;
    className?: string;
    headingClass?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: CommandGroupProps["className"];
  export let heading: CommandGroupProps["heading"];
  export let headingClass: CommandGroupProps["headingClass"];
</script>

<div role="group" class={className}>
  {#if heading}
    <div aria-hidden="true" class={headingClass}>{heading}</div>
  {/if}<slot />
</div>