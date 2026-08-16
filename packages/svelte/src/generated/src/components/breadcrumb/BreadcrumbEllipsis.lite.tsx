// @ts-nocheck
<script context="module" lang="ts">
  export interface BreadcrumbEllipsisProps {
    className?: string;
    /** Screen-reader label for the collapsed items (default "More") */
    label?: string;
  }

  // Represents collapsed breadcrumb items (e.g. behind a "…" or a menu).
</script>

<script lang="ts">
  export let className: BreadcrumbEllipsisProps["className"];
  export let label: BreadcrumbEllipsisProps["label"];
</script>

<span role="presentation" aria-hidden="true" class={className}
  ><svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    ><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle
      cx="5"
      cy="12"
      r="1"
    /></svg
  ><span class="sr-only">{label || "More"}</span></span
>