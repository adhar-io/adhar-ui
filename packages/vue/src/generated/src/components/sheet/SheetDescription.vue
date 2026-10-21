<template>
  <p :id="id" :class="classes"><slot /></p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { sheetDescriptionVariants } from "./sheet.styles.ts";

export interface SheetDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Sheet as `aria-describedby`.

export default defineComponent({
  name: "sheet-description",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(sheetDescriptionVariants(), this.className);
    },
  },
});
</script>