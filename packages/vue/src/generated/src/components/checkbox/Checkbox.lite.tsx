// @ts-nocheck
<template>
  <input
    type="checkbox"
    role="checkbox"
    :checked="state.isChecked"
    :disabled="props.disabled"
    :required="props.required"
    :name="props.name"
    :id="props.id"
    :value="props.value"
    :aria-checked="state.isChecked"
    :aria-label="props['aria-label']"
    @change="async (event) => state.handleChange(event)"
    :class="props.className"
  />
</template>

<script lang="ts">
export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  value?: string;
  className?: string;
  "aria-label"?: string;
  onChange?: (checked: boolean) => void;
}

export default defineComponent({
  name: "checkbox",

  props: ["disabled", "required", "name", "id", "value", "className"],
});
</script>