<template>
  <textarea
    ref="textareaRef"
    :placeholder="placeholder"
    :value="value"
    :defaultValue="defaultValue"
    :disabled="disabled"
    :readOnly="readOnly || readonly"
    :required="required"
    :rows="rows || 3"
    :maxLength="maxLength"
    :minLength="minLength"
    :name="name"
    :id="id"
    :form="form"
    :autoFocus="autoFocus"
    :spellcheck="spellcheck"
    :aria-label="'aria-label'"
    :aria-labelledby="'aria-labelledby'"
    :aria-describedby="'aria-describedby'"
    :aria-invalid="invalid || 'aria-invalid' ? true : undefined"
    @change="async (event) => onChange?.(event)"
    @input="async (event) => handleInput(event)"
    @focus="async (event) => onFocus?.(event)"
    @blur="async (event) => onBlur?.(event)"
    @keydown="async (event) => onKeyDown?.(event)"
    :class="classes"
  ></textarea>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { textareaVariants } from "./textarea.styles.ts";

export interface TextareaProps {
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Initial value when uncontrolled */
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  /** @deprecated Use `readOnly` */
  readonly?: boolean;
  required?: boolean;
  /** Marks the field as invalid: destructive border + aria-invalid */
  invalid?: boolean;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  /** Grow with the content instead of scrolling (up to `maxRows` if set) */
  autoResize?: boolean;
  /** Row cap for `autoResize` */
  maxRows?: number;
  size?: "sm" | "default" | "lg";
  name?: string;
  id?: string;
  form?: string;
  autoFocus?: boolean;
  spellcheck?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  onChange?: (event: any) => void;
  onInput?: (event: any) => void;
  /** Fires on every keystroke with the current string value */
  onValueChange?: (value: string) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
}

export default defineComponent({
  name: "textarea",

  props: [
    "value",
    "size",
    "autoResize",
    "className",
    "maxRows",
    "onInput",
    "onValueChange",
    "placeholder",
    "defaultValue",
    "disabled",
    "readOnly",
    "readonly",
    "required",
    "rows",
    "maxLength",
    "minLength",
    "name",
    "id",
    "form",
    "autoFocus",
    "spellcheck",
    "invalid",
    "onChange",
    "onFocus",
    "onBlur",
    "onKeyDown",
  ],

  mounted() {
    this.resize();
  },

  watch: {
    onUpdateHook0: {
      handler() {
        this.resize();
      },
      immediate: true,
    },
  },

  computed: {
    classes() {
      return cn(
        textareaVariants({
          size: this.size,
        }),
        this.autoResize ? "resize-none overflow-hidden" : "",
        this.className
      );
    },
    onUpdateHook0() {
      return {
        0: this.value,
      };
    },
  },

  methods: {
    resize() {
      const el = this.$refs.textareaRef;
      if (!this.autoResize || !el) return;
      el.style.height = "auto";
      let next = el.scrollHeight;
      if (this.maxRows) {
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20;
        const cap =
          lineHeight * this.maxRows + (el.offsetHeight - el.clientHeight) + 16;
        if (next > cap) {
          next = cap;
          el.style.overflowY = "auto";
        } else {
          el.style.overflowY = "hidden";
        }
      }
      el.style.height = next + "px";
    },
    handleInput(event: any) {
      this.onInput?.(event);
      this.onValueChange?.(event.target.value);
      this.resize();
    },
  },
});
</script>