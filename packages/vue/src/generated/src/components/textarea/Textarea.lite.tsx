// @ts-nocheck
<template>
  <textarea
    :placeholder="props.placeholder"
    :value="props.value"
    :disabled="props.disabled"
    :readOnly="props.readonly"
    :required="props.required"
    :rows="props.rows || 3"
    :name="props.name"
    :id="props.id"
    :aria-label="props['aria-label']"
    :aria-describedby="props['aria-describedby']"
    :aria-invalid="props['aria-invalid']"
    @change="async (event) => props.onChange?.(event)"
    @focus="async (event) => props.onFocus?.(event)"
    @blur="async (event) => props.onBlur?.(event)"
    :class="props.className"
  ></textarea>
</template>

<script lang="ts">
export interface TextareaProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  name?: string;
  id?: string;
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  onChange?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
}

export default defineComponent({
  name: "textarea",

  props: [
    "placeholder",
    "value",
    "disabled",
    "readonly",
    "required",
    "rows",
    "name",
    "id",
    "onChange",
    "onFocus",
    "onBlur",
    "className",
  ],
});
</script>