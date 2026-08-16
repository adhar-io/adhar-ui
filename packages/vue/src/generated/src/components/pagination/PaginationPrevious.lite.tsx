// @ts-nocheck
<template>
  <a
    :href="props.href"
    :aria-label="props['aria-label'] || 'Go to previous page'"
    :aria-disabled="props.disabled ? true : false"
    @click="async (event) => props.onClick?.(event)"
    :class="props.className"
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
      <path d="m15 18-6-6 6-6"></path></svg
    ><span>{{ props.label || "Previous" }}</span></a
  >
</template>

<script lang="ts">
export interface PaginationPreviousProps {
  href?: string;
  disabled?: boolean;
  className?: string;
  /** Visible label (default "Previous") */
  label?: string;
  "aria-label"?: string;
  onClick?: (event: any) => void;
}

export default defineComponent({
  name: "pagination-previous",

  props: ["href", "disabled", "onClick", "className", "label"],
});
</script>