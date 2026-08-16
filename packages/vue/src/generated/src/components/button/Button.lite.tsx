// @ts-nocheck
<template>
  <button
    :disabled="props.disabled || props.loading"
    :type="props.type || 'button'"
    :name="props.name"
    :value="props.value"
    :form="props.form"
    :aria-disabled="props.disabled || props.loading"
    :aria-busy="props.loading"
    :aria-label="props['aria-label']"
    :aria-controls="props['aria-controls']"
    :aria-expanded="props['aria-expanded']"
    :aria-pressed="props['aria-pressed']"
    :aria-haspopup="props['aria-haspopup']"
    @click="async (event) => props.onClick?.(event)"
    :class="props.className"
  >
    <template v-if="props.loading">
      <span
        aria-hidden="true"
        class="inline-block size-4 shrink-0 rounded-full border-2 border-current border-t-transparent animate-spin motion-reduce:animate-none"
      ></span>
      <span class="sr-only">{{ props.loadingText || "Loading" }}</span>
    </template>

    <slot />
  </button>
</template>

<script lang="ts">
export interface ButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Shows a spinner, sets aria-busy, and blocks interaction */
  loading?: boolean;
  /** Text announced by screen readers while loading (defaults to "Loading") */
  loadingText?: string;
  /** Stretches the button to fill its container */
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  name?: string;
  value?: string;
  form?: string;
  "aria-label"?: string;
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean;
  "aria-haspopup"?: boolean;
  onClick?: (event: any) => void;
  children?: any;
}

export default defineComponent({
  name: "button",

  props: [
    "disabled",
    "loading",
    "type",
    "name",
    "value",
    "form",
    "onClick",
    "className",
    "loadingText",
  ],
});
</script>