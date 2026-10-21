<template>
  <button
    :id="id"
    :title="title"
    :disabled="isInactive"
    :type="type || 'button'"
    :name="name"
    :value="value"
    :form="form"
    :autoFocus="autoFocus"
    :aria-busy="loading ? true : undefined"
    :aria-label="'aria-label'"
    :aria-describedby="'aria-describedby'"
    :aria-controls="'aria-controls'"
    :aria-expanded="'aria-expanded'"
    :aria-pressed="'aria-pressed'"
    :aria-haspopup="'aria-haspopup'"
    :data-loading="loading ? '' : undefined"
    @click="
      async (event) => {
        if (!isInactive) onClick?.(event);
      }
    "
    @focus="async (event) => onFocus?.(event)"
    @blur="async (event) => onBlur?.(event)"
    @keydown="async (event) => onKeyDown?.(event)"
    :class="classes"
  >
    <template v-if="loading">
      <span
        aria-hidden="true"
        class="inline-block size-4 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin motion-reduce:animate-none"
      ></span>
      <span class="sr-only">{{ loadingText || "Loading" }}</span>
    </template>

    <template v-if="!(loading && isIconOnly)">
      <slot />
    </template>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { buttonVariants } from "./button.styles.ts";

export interface ButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Shows a spinner, sets aria-busy, and blocks interaction */
  loading?: boolean;
  /** Text announced by screen readers while loading (defaults to "Loading") */
  loadingText?: string;
  /** Stretches the button to fill its container */
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  id?: string;
  title?: string;
  name?: string;
  value?: string;
  form?: string;
  autoFocus?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean;
  "aria-haspopup"?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  children?: any;
}

export default defineComponent({
  name: "button",

  props: [
    "variant",
    "size",
    "fullWidth",
    "className",
    "disabled",
    "loading",
    "id",
    "title",
    "type",
    "name",
    "value",
    "form",
    "autoFocus",
    "onClick",
    "onFocus",
    "onBlur",
    "onKeyDown",
    "loadingText",
  ],

  computed: {
    classes() {
      return cn(
        buttonVariants({
          variant: this.variant,
          size: this.size,
          fullWidth: !!this.fullWidth,
        }),
        this.className
      );
    },
    isIconOnly() {
      return !!this.size && this.size.indexOf("icon") === 0;
    },
    isInactive() {
      return !!this.disabled || !!this.loading;
    },
  },
});
</script>