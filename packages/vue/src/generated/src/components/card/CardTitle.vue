<template>
  <h3 :id="id" :class="classes"><slot /></h3>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { cardTitleVariants } from "./card.styles.ts";

export interface CardTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "card-title",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(cardTitleVariants(), this.className);
    },
  },
});
</script>