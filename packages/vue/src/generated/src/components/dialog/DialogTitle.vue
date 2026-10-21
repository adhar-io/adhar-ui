<template>
  <h2 :id="id" :class="classes"><slot /></h2>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { dialogTitleVariants } from "./dialog.styles.ts";

export interface DialogTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Dialog as `aria-labelledby` so it is announced on open.

export default defineComponent({
  name: "dialog-title",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(dialogTitleVariants(), this.className);
    },
  },
});
</script>