<template>
  <div :id="id" :class="classes"><slot /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { cardHeaderVariants } from "./card.styles.ts";

export interface CardHeaderProps {
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "card-header",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(cardHeaderVariants(), this.className);
    },
  },
});
</script>