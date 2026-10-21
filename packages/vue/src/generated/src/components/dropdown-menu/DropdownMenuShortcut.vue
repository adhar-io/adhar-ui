<template>
  <span aria-hidden="true" :id="id" :class="classes"><slot /></span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { dropdownMenuShortcutVariants } from "./dropdown-menu.styles.ts";

export interface DropdownMenuShortcutProps {
  className?: string;
  id?: string;
  children?: any;
}

// Keyboard shortcut hint shown at the end of a DropdownMenuItem.

export default defineComponent({
  name: "dropdown-menu-shortcut",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(dropdownMenuShortcutVariants(), this.className);
    },
  },
});
</script>