<template>
  <div :id="id" :class="classes"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { cardFooterVariants } from "./card.styles.ts";

export interface CardFooterProps {
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "card-footer",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(cardFooterVariants(), this.className);
    },
  },
});
</script>