// @ts-nocheck
<template>
  <span role="presentation" aria-hidden="true" :class="props.className"
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
    >
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="19" cy="12" r="1"></circle>
      <circle cx="5" cy="12" r="1"></circle></svg
    ><span class="sr-only">{{ props.label || "More" }}</span></span
  >
</template>

<script lang="ts">
export interface BreadcrumbEllipsisProps {
  className?: string;
  /** Screen-reader label for the collapsed items (default "More") */
  label?: string;
}

// Represents collapsed breadcrumb items (e.g. behind a "…" or a menu).

export default defineComponent({
  name: "breadcrumb-ellipsis",

  props: ["className", "label"],
});
</script>