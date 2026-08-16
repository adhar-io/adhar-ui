// @ts-nocheck
<template>
  <button
    type="button"
    role="switch"
    :id="props.id"
    :aria-checked="state.isChecked"
    :aria-label="props['aria-label']"
    :disabled="props.disabled"
    @click="async (event) => state.handleClick()"
    @keydown="async (event) => state.handleKeyDown(event)"
    :class="props.className"
  >
    <span :class="props.thumbClass"></span>
  </button>
</template>

<script lang="ts">
export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  thumbClass?: string;
  "aria-label"?: string;
  onChange?: (checked: boolean) => void;
}

export default defineComponent({
  name: "switch",

  props: ["id", "disabled", "className", "thumbClass"],
});
</script>