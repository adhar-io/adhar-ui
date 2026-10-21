<template>
  <button
    type="button"
    role="switch"
    :id="id"
    :aria-checked="isChecked"
    :aria-required="required ? true : undefined"
    :aria-label="'aria-label'"
    :aria-labelledby="'aria-labelledby'"
    :aria-describedby="'aria-describedby'"
    :data-state="dataState"
    :disabled="disabled"
    @click="async (event) => handleClick()"
    :class="classes"
  >
    <span :data-state="dataState" :class="thumbClasses"></span>
    <template v-if="name && isChecked">
      <input type="hidden" :name="name" :value="value || 'on'" :form="form" />
    </template>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { switchThumbVariants, switchVariants } from "./switch.styles.ts";

export interface SwitchProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial checked state when uncontrolled */
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: "sm" | "default" | "lg";
  /** Submits `value` (default "on") under this name when checked */
  name?: string;
  value?: string;
  form?: string;
  id?: string;
  className?: string;
  thumbClass?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /** Fires with the next checked state */
  onChange?: (checked: boolean) => void;
  /** Alias of `onChange` */
  onCheckedChange?: (checked: boolean) => void;
}

export default defineComponent({
  name: "switch",

  props: [
    "defaultChecked",
    "checked",
    "size",
    "className",
    "thumbClass",
    "disabled",
    "onChange",
    "onCheckedChange",
    "id",
    "required",
    "name",
    "value",
    "form",
  ],

  data() {
    return { internalChecked: false };
  },

  created() {
    this.internalChecked = !!this.defaultChecked;
  },

  computed: {
    isChecked() {
      return this.checked !== undefined ? !!this.checked : this.internalChecked;
    },
    dataState() {
      return this.isChecked ? "checked" : "unchecked";
    },
    classes() {
      return cn(
        switchVariants({
          size: this.size,
        }),
        this.className
      );
    },
    thumbClasses() {
      return cn(
        switchThumbVariants({
          size: this.size,
        }),
        this.thumbClass
      );
    },
  },

  methods: {
    handleClick() {
      if (this.disabled) return;
      const next = !this.isChecked;
      this.internalChecked = next;
      this.onChange?.(next);
      this.onCheckedChange?.(next);
    },
  },
});
</script>