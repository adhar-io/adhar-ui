<template>
  <kbd :aria-label="'aria-label'" :class="classes"><slot /></kbd>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { kbdVariants } from "./kbd.styles.ts";

export interface KbdProps {
  size?: "sm" | "default" | "lg";
  className?: string;
  /** Spoken label for the key when the glyph is not descriptive (e.g. "⌘" → "Command") */
  "aria-label"?: string;
  children?: any;
}

export default defineComponent({
  name: "kbd",

  props: ["size", "className"],

  computed: {
    classes() {
      return cn(
        kbdVariants({
          size: this.size,
        }),
        this.className
      );
    },
  },
});
</script>