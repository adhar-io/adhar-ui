<template>
  <div :id="id" :class="classes"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { sheetHeaderVariants } from "./sheet.styles.ts";

export interface SheetHeaderProps {
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "sheet-header",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(sheetHeaderVariants(), this.className);
    },
  },
});
</script>