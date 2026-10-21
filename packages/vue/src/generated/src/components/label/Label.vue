<template>
  <label
    :id="id"
    :for="htmlFor"
    :data-disabled="disabled ? '' : undefined"
    :class="classes"
    ><slot
  /></label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { labelVariants } from "./label.styles.ts";

export interface LabelProps {
  /** ID of the form control this label is bound to (compiles to `for` per framework) */
  htmlFor?: string;
  id?: string;
  /** Appends a required marker (*). The control itself should also set `required`. */
  required?: boolean;
  /** Dims the label to match a disabled control that is not its `peer` sibling */
  disabled?: boolean;
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "label",

  props: ["required", "disabled", "className", "id", "htmlFor"],

  computed: {
    classes() {
      return cn(
        labelVariants({
          required: !!this.required,
        }),
        this.disabled ? "cursor-not-allowed opacity-70" : "",
        this.className
      );
    },
  },
});
</script>