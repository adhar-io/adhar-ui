<template>
  <input
    :type="type || 'text'"
    :placeholder="placeholder"
    :value="value"
    :defaultValue="defaultValue"
    :disabled="disabled"
    :readOnly="readOnly || readonly"
    :required="required"
    :name="name"
    :id="id"
    :form="form"
    :autoComplete="autoComplete"
    :inputMode="inputMode"
    :enterKeyHint="enterKeyHint"
    :autoFocus="autoFocus"
    :spellcheck="spellcheck"
    :maxLength="maxLength"
    :minLength="minLength"
    :pattern="pattern"
    :min="min"
    :max="max"
    :step="step"
    :accept="accept"
    :multiple="multiple"
    :list="list"
    :title="title"
    :aria-label="'aria-label'"
    :aria-labelledby="'aria-labelledby'"
    :aria-describedby="'aria-describedby'"
    :aria-invalid="invalid || 'aria-invalid' ? true : undefined"
    :aria-errormessage="'aria-errormessage'"
    @change="async (event) => onChange?.(event)"
    @input="async (event) => handleInput(event)"
    @focus="async (event) => onFocus?.(event)"
    @blur="async (event) => onBlur?.(event)"
    @keydown="async (event) => onKeyDown?.(event)"
    :class="classes"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { inputVariants } from "./input.styles.ts";

export interface InputProps {
  type?: string;
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
  name?: string;
  id?: string;
  form?: string;
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "ghost" | "flush";
  /** Native autocomplete hint (e.g. "email", "current-password", "off") */
  autoComplete?: string;
  /** Virtual keyboard hint on touch devices */
  inputMode?:
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url";
  /** Enter-key label on virtual keyboards */
  enterKeyHint?:
    | "enter"
    | "done"
    | "go"
    | "next"
    | "previous"
    | "search"
    | "send";
  autoFocus?: boolean;
  spellcheck?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  /** Min value / date for numeric & date inputs */
  min?: string | number;
  /** Max value / date for numeric & date inputs */
  max?: string | number;
  /** Step increment for numeric & date inputs */
  step?: string | number;
  /** File inputs: accepted types, e.g. "image/*" */
  accept?: string;
  /** File / email inputs: allow multiple values */
  multiple?: boolean;
  list?: string;
  title?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  "aria-errormessage"?: string;
  onChange?: (event: any) => void;
  onInput?: (event: any) => void;
  /** Fires on every keystroke with the current string value */
  onValueChange?: (value: string) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
}

export default defineComponent({
  name: "input",

  props: [
    "size",
    "variant",
    "className",
    "onInput",
    "onValueChange",
    "type",
    "placeholder",
    "value",
    "defaultValue",
    "disabled",
    "readOnly",
    "readonly",
    "required",
    "name",
    "id",
    "form",
    "autoComplete",
    "inputMode",
    "enterKeyHint",
    "autoFocus",
    "spellcheck",
    "maxLength",
    "minLength",
    "pattern",
    "min",
    "max",
    "step",
    "accept",
    "multiple",
    "list",
    "title",
    "invalid",
    "onChange",
    "onFocus",
    "onBlur",
    "onKeyDown",
  ],

  computed: {
    classes() {
      return cn(
        inputVariants({
          size: this.size,
          variant: this.variant,
        }),
        this.className
      );
    },
  },

  methods: {
    handleInput(event: any) {
      this.onInput?.(event);
      this.onValueChange?.(event.target.value);
    },
  },
});
</script>