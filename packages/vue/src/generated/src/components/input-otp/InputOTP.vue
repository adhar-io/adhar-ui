<template>
  <input
    type="text"
    autoComplete="one-time-code"
    autoCorrect="off"
    :value="value"
    :defaultValue="defaultValue"
    :maxLength="maxLength"
    :inputMode="isNumeric ? 'numeric' : 'text'"
    :pattern="isNumeric ? '[0-9]*' : undefined"
    :autoCapitalize="isNumeric ? undefined : 'characters'"
    :spellcheck="false"
    :disabled="disabled"
    :required="required"
    :autoFocus="autoFocus"
    :name="name"
    :id="id"
    :form="form"
    :placeholder="placeholder"
    :aria-label="'aria-label' || 'One-time code'"
    :aria-invalid="invalid || 'aria-invalid' ? true : undefined"
    :aria-describedby="'aria-describedby'"
    @input="async (event) => handleInput(event)"
    :class="classes"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { inputOTPVariants } from "./input-otp.styles.ts";

export interface InputOTPProps {
  /** Controlled value */
  value?: string;
  /** Initial value when uncontrolled */
  defaultValue?: string;
  /** Number of digits/characters (maxLength). Default 6. */
  length?: number;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  name?: string;
  id?: string;
  form?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
  placeholder?: string;
  /**
   * "numeric" (default) shows the number pad and strips non-digits.
   * "text" allows alphanumeric codes.
   */
  inputMode?: "numeric" | "text";
  /** Marks the field as invalid: destructive border + aria-invalid */
  invalid?: boolean;
  "aria-label"?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  /** Fired on every change with the current value */
  onValueChange?: (value: string) => void;
  /** Fired once each time the value reaches `length` characters */
  onComplete?: (value: string) => void;
}

export default defineComponent({
  name: "input-otp",

  props: [
    "length",
    "inputMode",
    "size",
    "className",
    "onValueChange",
    "onComplete",
    "value",
    "defaultValue",
    "disabled",
    "required",
    "autoFocus",
    "name",
    "id",
    "form",
    "placeholder",
    "invalid",
  ],

  data() {
    return { lastLength: 0 };
  },

  computed: {
    maxLength() {
      return this.length || 6;
    },
    isNumeric() {
      return this.inputMode !== "text";
    },
    classes() {
      return cn(
        inputOTPVariants({
          size: this.size,
        }),
        this.className
      );
    },
  },

  methods: {
    handleInput(event: any) {
      const raw: string = event.target.value || "";
      let next = this.isNumeric
        ? raw.replace(/\D/g, "")
        : raw.replace(/\s/g, "");
      next = next.slice(0, this.maxLength);
      if (next !== raw) event.target.value = next;
      this.onValueChange?.(next);
      if (next.length === this.maxLength && this.lastLength < this.maxLength) {
        this.onComplete?.(next);
      }
      this.lastLength = next.length;
    },
  },
});
</script>