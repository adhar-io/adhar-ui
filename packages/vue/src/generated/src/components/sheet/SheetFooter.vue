<template>
  <div :id="id" :class="classes"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { sheetFooterVariants } from "./sheet.styles.ts";

export interface SheetFooterProps {
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "sheet-footer",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(sheetFooterVariants(), this.className);
    },
  },
});
</script>