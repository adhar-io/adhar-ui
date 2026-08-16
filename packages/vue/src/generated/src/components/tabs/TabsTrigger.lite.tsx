// @ts-nocheck
<template>
  <button
    type="button"
    role="tab"
    :aria-selected="props.active"
    :disabled="props.disabled"
    :tabIndex="props.active ? 0 : -1"
    :data-value="props.value"
    @click="async (event) => props.onClick?.(props.value)"
    :class="props.className"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export interface TabsTriggerProps {
  value: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (value: string) => void;
  children?: any;
}

export default defineComponent({
  name: "tabs-trigger",

  props: ["active", "disabled", "value", "onClick", "className"],
});
</script>