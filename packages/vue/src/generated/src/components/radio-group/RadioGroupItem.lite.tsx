// @ts-nocheck
<template>
  <button
    type="button"
    role="radio"
    :id="props.id"
    :value="props.value"
    :aria-checked="props.checked ? true : false"
    :aria-label="props['aria-label']"
    :aria-labelledby="props['aria-labelledby']"
    :disabled="props.disabled"
    @click="
      async (event) =>
        props.disabled ? undefined : props.onSelect?.(props.value)
    "
    @keydown="
      async (event) => {
        if ((event.key === ' ' || event.key === 'Enter') && !props.disabled) {
          event.preventDefault();
          props.onSelect?.(props.value);
        }
      }
    "
    :class="props.className"
  >
    <template v-if="props.checked">
      <span aria-hidden="true" :class="props.indicatorClass"></span>
    </template>
  </button>
</template>

<script lang="ts">
export interface RadioGroupItemProps {
  /** The value this item represents within its group */
  value: string;
  /** Whether this item is the selected one */
  checked?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  /** Classes for the inner selected-state dot */
  indicatorClass?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /** Fired with this item's value when the user selects it */
  onSelect?: (value: string) => void;
}

export default defineComponent({
  name: "radio-group-item",

  props: [
    "id",
    "value",
    "checked",
    "disabled",
    "onSelect",
    "className",
    "indicatorClass",
  ],
});
</script>