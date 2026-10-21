<template>
  <input
    type="checkbox"
    ref="inputRef"
    :checked="isChecked"
    :disabled="disabled"
    :required="required"
    :name="name"
    :id="id"
    :form="form"
    :value="value"
    :data-state="dataState"
    :aria-checked="indeterminate ? 'mixed' : undefined"
    :aria-invalid="invalid ? true : undefined"
    :aria-label="'aria-label'"
    :aria-labelledby="'aria-labelledby'"
    :aria-describedby="'aria-describedby'"
    @change="async (event) => handleChange(event)"
    :class="classes"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { checkboxVariants } from "./checkbox.styles.ts";

export interface CheckboxProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial checked state when uncontrolled */
  defaultChecked?: boolean;
  /** Shows the mixed (dash) state, e.g. for a "select all" with some rows selected */
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  /** Marks the field as invalid: destructive ring + aria-invalid */
  invalid?: boolean;
  size?: "sm" | "default" | "lg";
  name?: string;
  id?: string;
  form?: string;
  value?: string;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /** Fires with the next checked state */
  onChange?: (checked: boolean) => void;
  /** Alias of `onChange` */
  onCheckedChange?: (checked: boolean) => void;
}

export default defineComponent({
  name: "checkbox",

  props: [
    "defaultChecked",
    "indeterminate",
    "checked",
    "size",
    "className",
    "onChange",
    "onCheckedChange",
    "disabled",
    "required",
    "name",
    "id",
    "form",
    "value",
    "invalid",
  ],

  data() {
    return { internalChecked: false };
  },

  created() {
    this.internalChecked = !!this.defaultChecked;
  },
  mounted() {
    this.syncIndeterminate();
  },

  watch: {
    onUpdateHook0: {
      handler() {
        this.syncIndeterminate();
      },
      immediate: true,
    },
  },

  computed: {
    isChecked() {
      return this.checked !== undefined ? !!this.checked : this.internalChecked;
    },
    classes() {
      return cn(
        checkboxVariants({
          size: this.size,
        }),
        this.className
      );
    },
    dataState() {
      if (this.indeterminate) return "indeterminate";
      return this.isChecked ? "checked" : "unchecked";
    },
    onUpdateHook0() {
      return {
        0: this.indeterminate,
      };
    },
  },

  methods: {
    syncIndeterminate() {
      if (this.$refs.inputRef)
        this.$refs.inputRef.indeterminate = !!this.indeterminate;
    },
    handleChange(event: any) {
      const next = !!event.target.checked;
      this.internalChecked = next;
      this.onChange?.(next);
      this.onCheckedChange?.(next);
    },
  },
});
</script>