<template>
  <p :id="id" :class="classes"><slot /></p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { dialogDescriptionVariants } from "./dialog.styles.ts";

export interface DialogDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Dialog as `aria-describedby`.

export default defineComponent({
  name: "dialog-description",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(dialogDescriptionVariants(), this.className);
    },
  },
});
</script>