// @ts-nocheck
<template>
  <button
    type="button"
    :id="props.id"
    :value="props.value"
    :aria-pressed="props.pressed ? true : false"
    :aria-label="props['aria-label']"
    :data-state="props.pressed ? 'on' : 'off'"
    :disabled="props.disabled"
    @click="
      async (event) =>
        props.disabled ? undefined : props.onToggle?.(props.value)
    "
    :class="props.className"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export interface ToggleGroupItemProps {
  /** The value this item represents within its group */
  value: string;
  /** Whether this item is currently pressed/on */
  pressed?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  /** Fired with this item's value when activated */
  onToggle?: (value: string) => void;
  children?: any;
}

export default defineComponent({
  name: "toggle-group-item",

  props: ["id", "value", "pressed", "disabled", "onToggle", "className"],
});
</script>