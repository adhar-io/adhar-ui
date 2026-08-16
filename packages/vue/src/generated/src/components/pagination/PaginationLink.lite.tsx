// @ts-nocheck
<template>
  <a
    :href="props.href"
    :aria-current="props.isActive ? 'page' : undefined"
    :aria-disabled="props.disabled ? true : false"
    :aria-label="props['aria-label']"
    @click="async (event) => props.onClick?.(event)"
    :class="props.className"
    ><slot
  /></a>
</template>

<script lang="ts">
export interface PaginationLinkProps {
  href?: string;
  /** Marks this link as the current page (sets aria-current="page") */
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
  onClick?: (event: any) => void;
  children?: any;
}

export default defineComponent({
  name: "pagination-link",

  props: ["href", "isActive", "disabled", "onClick", "className"],
});
</script>