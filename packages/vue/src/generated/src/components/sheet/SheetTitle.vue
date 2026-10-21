<template>
  <h2 :id="id" :class="classes"><slot /></h2>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { sheetTitleVariants } from "./sheet.styles.ts";

export interface SheetTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Sheet as `aria-labelledby` so it is announced on open.

export default defineComponent({
  name: "sheet-title",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(sheetTitleVariants(), this.className);
    },
  },
});
</script>