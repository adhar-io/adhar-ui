<script context="module" lang="ts">
  export interface CommandGroupProps {
    heading?: string;
    className?: string;
    headingClass?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import {
    commandGroupHeadingVariants,
    commandGroupVariants,
  } from "./command.styles.ts";

  export let className: CommandGroupProps["className"] = undefined;
  export let headingClass: CommandGroupProps["headingClass"] = undefined;
  export let heading: CommandGroupProps["heading"] = undefined;

  $: classes = () => {
    return cn(commandGroupVariants(), className);
  };
  $: headingClasses = () => {
    return cn(commandGroupHeadingVariants(), headingClass);
  };
</script>

<div role="group" aria-label={heading} class={classes()}>
  {#if heading}
    <div aria-hidden="true" class={headingClasses()}>{heading}</div>
  {/if}<slot />
</div>