// @ts-nocheck
<script context="module" lang="ts">
  export interface PaginationProps {
    className?: string;
    "aria-label"?: string;
    children?: any;
  }
</script>

<script lang="ts">
  export let className: PaginationProps["className"];
</script>

<nav
  role="navigation"
  aria-label={"aria-label" || "Pagination"}
  class={className}
>
  <slot />
</nav>