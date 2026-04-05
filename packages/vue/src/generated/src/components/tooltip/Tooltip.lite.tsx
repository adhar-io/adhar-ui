<template>
  <div
    :style="{
      position: 'relative',
      display: 'inline-block',
    }"
    :class="props.className"
  >
    <div
      @mouseenter="async (event) => state.handleMouseEnter()"
      @mouseleave="async (event) => state.handleMouseLeave()"
      @focus="async (event) => state.handleFocus()"
      @blur="async (event) => state.handleBlur()"
      :aria-describedby="state.visible ? 'tooltip-content' : undefined"
      :class="props.triggerClass"
    >
      <slot />
    </div>
    <template v-if="state.visible">
      <div id="tooltip-content" role="tooltip" :class="props.contentClass">
        {{ props.content }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export interface TooltipProps {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  delay?: number;
  children?: any;
}

export default defineComponent({
  name: "tooltip",

  props: ["className", "triggerClass", "contentClass", "content"],
});
</script>