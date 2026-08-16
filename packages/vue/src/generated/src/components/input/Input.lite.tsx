// @ts-nocheck
<template>
  <input
    :type="props.type || 'text'"
    :placeholder="props.placeholder"
    :value="props.value"
    :defaultValue="props.defaultValue"
    :disabled="props.disabled"
    :readOnly="props.readonly"
    :required="props.required"
    :name="props.name"
    :id="props.id"
    :autoComplete="props.autoComplete"
    :inputMode="props.inputMode"
    :enterKeyHint="props.enterKeyHint"
    :autoFocus="props.autoFocus"
    :spellcheck="props.spellcheck"
    :maxLength="props.maxLength"
    :minLength="props.minLength"
    :pattern="props.pattern"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :list="props.list"
    :aria-label="props['aria-label']"
    :aria-describedby="props['aria-describedby']"
    :aria-invalid="props['aria-invalid']"
    :aria-errormessage="props['aria-errormessage']"
    @change="async (event) => props.onChange?.(event)"
    @input="async (event) => props.onInput?.(event)"
    @focus="async (event) => props.onFocus?.(event)"
    @blur="async (event) => props.onBlur?.(event)"
    @keydown="async (event) => props.onKeyDown?.(event)"
    :class="props.className"
  />
</template>

<script lang="ts">
export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
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
  list?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  "aria-errormessage"?: string;
  onChange?: (event: any) => void;
  onInput?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
}

export default defineComponent({
  name: "input",

  props: [
    "type",
    "placeholder",
    "value",
    "defaultValue",
    "disabled",
    "readonly",
    "required",
    "name",
    "id",
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
    "list",
    "onChange",
    "onInput",
    "onFocus",
    "onBlur",
    "onKeyDown",
    "className",
  ],
});
</script>