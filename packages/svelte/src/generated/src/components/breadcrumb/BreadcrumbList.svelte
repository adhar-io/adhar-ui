<script context="module" lang="ts">
  export interface BreadcrumbListProps {
    className?: string;
    id?: string;
    children?: any;
  }
</script>

<script lang="ts">
  import { cn } from "@adhar-ui/utils";
  import { breadcrumbListVariants } from "./breadcrumb.styles.ts";

  export let className: BreadcrumbListProps["className"] = undefined;
  export let id: BreadcrumbListProps["id"] = undefined;

  $: classes = () => {
    return cn(breadcrumbListVariants(), className);
  };
</script>

<ol {id} class={classes()}><slot /></ol>