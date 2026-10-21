<template>
  <div role="separator" aria-orientation="horizontal" :class="classes"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { commandSeparatorVariants } from "./command.styles.ts";

export interface CommandSeparatorProps {
  className?: string;
}

export default defineComponent({
  name: "command-separator",

  props: ["className"],

  computed: {
    classes() {
      return cn(commandSeparatorVariants(), this.className);
    },
  },
});
</script>