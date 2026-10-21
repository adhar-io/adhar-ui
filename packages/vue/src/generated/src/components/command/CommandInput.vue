<template>
  <div :class="wrapperClasses">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      class="shrink-0 text-muted-foreground"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path></svg
    ><input
      type="text"
      role="combobox"
      aria-expanded="true"
      aria-autocomplete="list"
      autoComplete="off"
      autoCorrect="off"
      :aria-controls="'aria-controls'"
      :aria-activedescendant="'aria-activedescendant'"
      :aria-label="'aria-label' || 'Search'"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      :autoFocus="autoFocus"
      :spellcheck="false"
      @input="async (event) => handleInput(event)"
      @keydown="async (event) => onKeyDown?.(event)"
      :class="classes"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import {
  commandInputVariants,
  commandInputWrapperVariants,
} from "./command.styles.ts";

export interface CommandInputProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  wrapperClass?: string;
  "aria-label"?: string;
  /** ID of the listbox this input controls (for combobox semantics) */
  "aria-controls"?: string;
  /** ID of the highlighted CommandItem, so screen readers follow the highlight */
  "aria-activedescendant"?: string;
  onValueChange?: (value: string) => void;
  onKeyDown?: (event: any) => void;
}

export default defineComponent({
  name: "command-input",

  props: [
    "className",
    "wrapperClass",
    "onValueChange",
    "placeholder",
    "value",
    "disabled",
    "autoFocus",
    "onKeyDown",
  ],

  computed: {
    classes() {
      return cn(commandInputVariants(), this.className);
    },
    wrapperClasses() {
      return cn(commandInputWrapperVariants(), this.wrapperClass);
    },
  },

  methods: {
    handleInput(event: any) {
      this.onValueChange?.(event.target.value);
    },
  },
});
</script>