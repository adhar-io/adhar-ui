<script context="module" lang="ts">
  export interface BreadcrumbItemProps {
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { breadcrumbItemVariants } from "./breadcrumb.styles.ts";

  export let className: BreadcrumbItemProps["className"] = undefined;
  export let id: BreadcrumbItemProps["id"] = undefined;

  $: classes = () => {
    return cn(breadcrumbItemVariants(), className);
  };
</script>

<li {id} class={classes()}><slot /></li>