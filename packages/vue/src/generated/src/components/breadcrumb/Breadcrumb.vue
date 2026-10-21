<template>
  <nav :aria-label="'aria-label' || 'Breadcrumb'" :class="className">
    <slot />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface BreadcrumbProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "breadcrumb",

  props: ["className"],
});
</script>