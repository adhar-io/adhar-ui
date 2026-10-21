<script context="module" lang="ts">
  export interface BreadcrumbPageProps {
    className?: string;
    children?: any;
  }

  // The current page — not a link. aria-current="page" marks it for AT.
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { breadcrumbPageVariants } from "./breadcrumb.styles.ts";

  export let className: BreadcrumbPageProps["className"] = undefined;

  $: classes = () => {
    return cn(breadcrumbPageVariants(), className);
  };
</script>

<span aria-current="page" class={classes()}><slot /></span>