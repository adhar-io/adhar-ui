<template>
  <div :id="id" :class="classes"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { alertDescriptionVariants } from "./alert.styles.ts";

export interface AlertDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "alert-description",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(alertDescriptionVariants(), this.className);
    },
  },
});
</script>