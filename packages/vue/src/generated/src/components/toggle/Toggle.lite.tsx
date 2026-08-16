// @ts-nocheck
<template>
  <button
    type="button"
    :id="props.id"
    :aria-pressed="props.pressed ? true : false"
    :aria-label="props['aria-label']"
    :data-state="props.pressed ? 'on' : 'off'"
    :disabled="props.disabled"
    @click="
      async (event) =>
        props.disabled ? undefined : props.onPressedChange?.(!props.pressed)
    "
    :class="props.className"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export interface ToggleProps {
  /** Whether the toggle is currently pressed/on (controlled) */
  pressed?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  /** Fired with the next pressed state when activated */
  onPressedChange?: (pressed: boolean) => void;
  children?: any;
}

export default defineComponent({
  name: "toggle",

  props: ["id", "pressed", "disabled", "onPressedChange", "className"],
});
</script>