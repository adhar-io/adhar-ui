<template>
  <span :aria-label="'aria-label'" :class="classes"><slot /></span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { commandShortcutVariants } from "./command.styles.ts";

export interface CommandShortcutProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "command-shortcut",

  props: ["className"],

  computed: {
    classes() {
      return cn(commandShortcutVariants(), this.className);
    },
  },
});
</script>