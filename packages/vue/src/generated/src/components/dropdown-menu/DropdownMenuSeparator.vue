<template>
  <div role="separator" :class="classes"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { dropdownMenuSeparatorVariants } from "./dropdown-menu.styles.ts";

export interface DropdownMenuSeparatorProps {
  className?: string;
}

export default defineComponent({
  name: "dropdown-menu-separator",

  props: ["className"],

  computed: {
    classes() {
      return cn(dropdownMenuSeparatorVariants(), this.className);
    },
  },
});
</script>