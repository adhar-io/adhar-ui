<template>
  <div
    @mouseenter="async (event) => show(false)"
    @mouseleave="async (event) => hide()"
    @keydown="async (event) => handleKeyDown(event)"
    :class="rootClasses"
  >
    <div
      @focusin="async (event) => show(true)"
      @focusout="async (event) => hide()"
      :aria-describedby="visible ? tooltipId : undefined"
      :class="triggerClass"
    >
      <slot />
    </div>
    <template v-if="visible">
      <div
        role="tooltip"
        data-state="open"
        :id="tooltipId"
        :data-side="resolvedSide"
        :class="contentClasses"
      >
        {{ content }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn, generateId } from "@adhar-ui/utils";
import { tooltipContentVariants } from "./tooltip.styles.ts";
import { placementVariants } from "../_internal/placement.styles.ts";

export interface TooltipProps {
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  /** Hover delay in ms before showing (default 300). Keyboard focus shows immediately. */
  delay?: number;
  /** Suppress the tooltip (e.g. while a menu it labels is open) */
  disabled?: boolean;
  /** Content id; generated when omitted */
  id?: string;
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  children?: any;
}

// Shows on hover (after `delay`) and on keyboard focus, hides on Escape. The
// pointer can move onto the tooltip without it closing (WCAG 1.4.13).

export default defineComponent({
  name: "tooltip",

  props: [
    "id",
    "side",
    "className",
    "align",
    "contentClass",
    "disabled",
    "content",
    "delay",
    "triggerClass",
  ],

  data() {
    return {
      visible: false,
      generatedId: "",
      inst: {
        timer: 0 as any,
      },
    };
  },

  created() {
    this.generatedId = generateId("adhar-tooltip");
  },

  unmounted() {
    this.clearTimer();
  },

  computed: {
    tooltipId() {
      return this.id || this.generatedId;
    },
    resolvedSide() {
      return this.side || "top";
    },
    rootClasses() {
      return cn("relative inline-block", this.className);
    },
    contentClasses() {
      return cn(
        placementVariants({
          side: this.resolvedSide,
          align: this.align,
        }),
        tooltipContentVariants(),
        "w-max max-w-xs",
        this.contentClass
      );
    },
  },

  methods: {
    clearTimer() {
      if (this.inst.timer) clearTimeout(this.inst.timer);
      this.inst.timer = 0;
    },
    show(immediate: boolean) {
      if (this.disabled || !this.content) return;
      this.clearTimer();
      const delay = this.delay === undefined ? 300 : this.delay;
      if (immediate || delay <= 0) {
        this.visible = true;
      } else {
        this.inst.timer = setTimeout(() => {
          this.visible = true;
        }, delay);
      }
    },
    hide() {
      this.clearTimer();
      this.visible = false;
    },
    handleKeyDown(event: any) {
      if (event.key === "Escape" && this.visible) {
        event.stopPropagation();
        this.hide();
      }
    },
  },
});
</script>