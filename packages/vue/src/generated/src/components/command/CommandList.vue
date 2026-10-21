<template>
  <div
    role="listbox"
    :id="id"
    :aria-label="'aria-label' || 'Suggestions'"
    :class="classes"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { commandListVariants } from "./command.styles.ts";

export interface CommandListProps {
  id?: string;
  className?: string;
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "command-list",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(commandListVariants(), this.className);
    },
  },
});
</script>