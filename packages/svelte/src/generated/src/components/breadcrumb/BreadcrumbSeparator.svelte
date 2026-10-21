<script context="module" lang="ts">
  export interface BreadcrumbSeparatorProps {
    className?: string;
    /** Custom separator content; defaults to a chevron */
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { breadcrumbSeparatorVariants } from "./breadcrumb.styles.ts";

  export let className: BreadcrumbSeparatorProps["className"] = undefined;

  $: classes = () => {
    return cn(breadcrumbSeparatorVariants(), className);
  };
</script>

<li role="presentation" aria-hidden="true" class={classes()}>
  {#if $$slots.default}
    <slot />
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg
    >
  {/if}
</li>