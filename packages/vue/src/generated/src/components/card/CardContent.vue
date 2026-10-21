<template>
  <div :id="id" :class="classes"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { cardContentVariants } from "./card.styles.ts";

export interface CardContentProps {
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "card-content",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(cardContentVariants(), this.className);
    },
  },
});
</script>