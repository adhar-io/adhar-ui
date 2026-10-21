<template>
  <div :id="id" :class="classes"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { dialogFooterVariants } from "./dialog.styles.ts";

export interface DialogFooterProps {
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "dialog-footer",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(dialogFooterVariants(), this.className);
    },
  },
});
</script>