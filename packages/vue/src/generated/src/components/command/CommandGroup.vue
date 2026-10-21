<template>
  <div role="group" :aria-label="heading" :class="classes">
    <template v-if="heading">
      <div aria-hidden="true" :class="headingClasses">{{ heading }}</div>
    </template>

    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import {
  commandGroupHeadingVariants,
  commandGroupVariants,
} from "./command.styles.ts";

export interface CommandGroupProps {
  heading?: string;
  className?: string;
  headingClass?: string;
  children?: any;
}

export default defineComponent({
  name: "command-group",

  props: ["className", "headingClass", "heading"],

  computed: {
    classes() {
      return cn(commandGroupVariants(), this.className);
    },
    headingClasses() {
      return cn(commandGroupHeadingVariants(), this.headingClass);
    },
  },
});
</script>