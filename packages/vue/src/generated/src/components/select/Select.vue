<template>
  <select
    :value="value"
    :defaultValue="defaultValue"
    :disabled="disabled"
    :required="required"
    :name="name"
    :id="id"
    :form="form"
    :autoComplete="autoComplete"
    :aria-label="'aria-label'"
    :aria-labelledby="'aria-labelledby'"
    :aria-describedby="'aria-describedby'"
    :aria-invalid="invalid ? true : undefined"
    @change="async (event) => handleChange(event)"
    @blur="async (event) => onBlur?.(event)"
    :class="classes"
  >
    <template v-if="placeholder">
      <option value="" :hidden="true">{{ placeholder }}</option>
    </template>

    <slot />
  </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { selectTriggerVariants } from "./select.styles.ts";

export interface SelectProps {
  /** Controlled value */
  value?: string;
  /** Initial value when uncontrolled */
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  /** Marks the field as invalid: destructive border + aria-invalid */
  invalid?: boolean;
  name?: string;
  id?: string;
  form?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
  /**
   * Text shown while nothing is selected. Rendered as an empty-valued option,
   * so `required` validation fails until the user picks a real option.
   */
  placeholder?: string;
  autoComplete?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  onChange?: (event: any) => void;
  /** Fires with the newly selected option’s value */
  onValueChange?: (value: string) => void;
  onBlur?: (event: any) => void;
  /** <option> / <optgroup> elements */
  children?: any;
}

export default defineComponent({
  name: "select",

  props: [
    "size",
    "className",
    "onChange",
    "onValueChange",
    "value",
    "defaultValue",
    "disabled",
    "required",
    "name",
    "id",
    "form",
    "autoComplete",
    "invalid",
    "onBlur",
    "placeholder",
  ],

  computed: {
    classes() {
      return cn(
        selectTriggerVariants({
          size: this.size,
        }),
        this.className
      );
    },
  },

  methods: {
    handleChange(event: any) {
      this.onChange?.(event);
      this.onValueChange?.(event.target.value);
    },
  },
});
</script>