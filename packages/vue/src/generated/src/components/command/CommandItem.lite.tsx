// @ts-nocheck
<template>
  <div
    role="option"
    :id="props.id"
    :tabIndex="-1"
    :aria-selected="props.selected ? true : false"
    :aria-disabled="props.disabled ? true : false"
    :data-selected="props.selected ? 'true' : 'false'"
    @click="
      async (event) =>
        props.disabled ? undefined : props.onSelect?.(props.value || '')
    "
    :class="props.className"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export interface CommandItemProps {
  /** The value this item represents (passed to onSelect) */
  value?: string;
  /** Whether this item is the active/highlighted option */
  selected?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  onSelect?: (value: string) => void;
  children?: any;
}

export default defineComponent({
  name: "command-item",

  props: ["id", "selected", "disabled", "onSelect", "value", "className"],
});
</script>