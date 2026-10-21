<template>
  <h5 :id="id" :class="classes"><slot /></h5>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { alertTitleVariants } from "./alert.styles.ts";

export interface AlertTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "alert-title",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(alertTitleVariants(), this.className);
    },
  },
});
</script>