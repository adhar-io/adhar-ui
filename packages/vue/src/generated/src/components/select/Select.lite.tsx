// @ts-nocheck
<template>
  <select
    :value="props.value"
    :disabled="props.disabled"
    :required="props.required"
    :name="props.name"
    :id="props.id"
    :aria-label="props['aria-label']"
    @change="async (event) => props.onChange?.(event)"
    :class="props.className"
  >
    <slot />
  </select>
</template>

<script lang="ts">
export interface SelectProps {
  value?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  "aria-label"?: string;
  onChange?: (event: any) => void;
  children?: any;
}

export default defineComponent({
  name: "select",

  props: [
    "value",
    "disabled",
    "required",
    "name",
    "id",
    "onChange",
    "className",
  ],
});
</script>