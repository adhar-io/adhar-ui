<template>
  <p :id="id" :class="classes"><slot /></p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { cardDescriptionVariants } from "./card.styles.ts";

export interface CardDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

export default defineComponent({
  name: "card-description",

  props: ["className", "id"],

  computed: {
    classes() {
      return cn(cardDescriptionVariants(), this.className);
    },
  },
});
</script>