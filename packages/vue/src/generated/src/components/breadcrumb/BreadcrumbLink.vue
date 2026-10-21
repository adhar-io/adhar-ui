<template>
  <a
    :href="href"
    :target="target"
    :rel="rel"
    @click="async (event) => onClick?.(event)"
    :class="classes"
    ><slot
  /></a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { breadcrumbLinkVariants } from "./breadcrumb.styles.ts";

export interface BreadcrumbLinkProps {
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  /** Use for client-side routing; call event.preventDefault() to stop the native navigation */
  onClick?: (event: any) => void;
  children?: any;
}

export default defineComponent({
  name: "breadcrumb-link",

  props: ["className", "href", "target", "rel", "onClick"],

  computed: {
    classes() {
      return cn(breadcrumbLinkVariants(), this.className);
    },
  },
});
</script>