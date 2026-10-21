<template>
  <div :id="id" :class="classes"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { dialogHeaderVariants } from "./dialog.styles.ts";

export interface DialogHeaderProps {
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "dialog-header",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(dialogHeaderVariants(), this.className);
    },
  },
});
</script>