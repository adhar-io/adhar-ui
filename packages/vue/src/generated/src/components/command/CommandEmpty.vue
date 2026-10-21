<template>
  <div role="presentation" :class="classes"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { commandEmptyVariants } from "./command.styles.ts";

export interface CommandEmptyProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "command-empty",

  props: ["className"],

  computed: {
    classes() {
      return cn(commandEmptyVariants(), this.className);
    },
  },
});
</script>