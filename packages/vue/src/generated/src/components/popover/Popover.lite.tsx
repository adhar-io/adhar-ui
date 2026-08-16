// @ts-nocheck
<template>
  <div
    :style="{
      position: 'relative',
      display: 'inline-block',
    }"
    :class="props.className"
  >
    <button
      type="button"
      aria-haspopup="dialog"
      :aria-expanded="state.isOpen"
      @click="async (event) => state.toggle()"
      :class="props.triggerClass"
    >
      {{ props.trigger }}
    </button>
    <template v-if="state.isOpen">
      <div
        role="dialog"
        @keydown="async (event) => state.handleKeyDown(event)"
        :tabIndex="-1"
        :class="props.contentClass"
      >
        <slot />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export interface PopoverProps {
  open?: boolean;
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  side?: "top" | "right" | "bottom" | "left";
  onOpenChange?: (open: boolean) => void;
  trigger?: any;
  children?: any;
}

export default defineComponent({
  name: "popover",

  props: ["className", "triggerClass", "trigger", "contentClass"],
});
</script>