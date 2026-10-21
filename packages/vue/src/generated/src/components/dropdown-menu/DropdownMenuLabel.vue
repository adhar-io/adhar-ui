<template>
  <div role="presentation" :id="id" :class="classes"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { dropdownMenuLabelVariants } from "./dropdown-menu.styles.ts";

export interface DropdownMenuLabelProps {
  className?: string;
  id?: string;
  children?: any;
}

// Non-interactive heading for a group of menu items.

export default defineComponent({
  name: "dropdown-menu-label",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(dropdownMenuLabelVariants(), this.className);
    },
  },
});
</script>