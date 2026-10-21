<template>
  <template v-if="isOpen">
    <div
      aria-atomic="true"
      data-state="open"
      :role="isUrgent ? 'alert' : 'status'"
      :aria-live="isUrgent ? 'assertive' : 'polite'"
      @mouseenter="async (event) => stopTimer()"
      @mouseleave="async (event) => startTimer()"
      @focusin="async (event) => stopTimer()"
      @focusout="async (event) => startTimer()"
      :class="classes"
    >
      <div class="grid flex-1 gap-1">
        <template v-if="title">
          <div :class="titleClasses">{{ title }}</div>
        </template>

        <template v-if="description">
          <div :class="descriptionClasses">{{ description }}</div>
        </template>

        <slot />
      </div>
      <template v-if="!hideClose">
        <button
          type="button"
          :aria-label="closeLabel || 'Close'"
          @click="async (event) => onClose?.()"
          :class="closeClasses"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </template>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import {
  toastCloseVariants,
  toastDescriptionVariants,
  toastTitleVariants,
  toastVariants,
} from "./toast.styles.ts";

export interface ToastProps {
  /** Visible unless explicitly false */
  open?: boolean;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  className?: string;
  titleClass?: string;
  descriptionClass?: string;
  closeClass?: string;
  title?: string;
  description?: string;
  /**
   * Auto-dismiss after this many ms (calls onClose). 0 or omitted keeps the
   * toast open. The timer pauses while hovered or focused.
   */
  duration?: number;
  /** Hide the close button (e.g. when an action closes the toast) */
  hideClose?: boolean;
  /** Accessible label for the close button (default "Close") */
  closeLabel?: string;
  onClose?: () => void;
  /** Actions or extra content below the description */
  children?: any;
}

export default defineComponent({
  name: "toast",

  props: [
    "duration",
    "open",
    "variant",
    "className",
    "titleClass",
    "descriptionClass",
    "closeClass",
    "onClose",
    "title",
    "description",
    "hideClose",
    "closeLabel",
  ],

  data() {
    return {
      inst: {
        timer: 0 as any,
      },
    };
  },

  watch: {
    onUpdateHook0: {
      handler() {
        this.startTimer();
      },
      immediate: true,
    },
  },
  unmounted() {
    this.stopTimer();
  },

  computed: {
    isOpen() {
      return this.open !== false;
    },
    isUrgent() {
      return this.variant === "destructive" || this.variant === "warning";
    },
    classes() {
      return cn(
        toastVariants({
          variant: this.variant,
        }),
        this.className
      );
    },
    titleClasses() {
      return cn(toastTitleVariants(), this.titleClass);
    },
    descriptionClasses() {
      return cn(toastDescriptionVariants(), this.descriptionClass);
    },
    closeClasses() {
      return cn(toastCloseVariants(), this.closeClass);
    },
    onUpdateHook0() {
      return {
        0: this.isOpen,
        1: this.duration,
      };
    },
  },

  methods: {
    stopTimer() {
      if (this.inst.timer) clearTimeout(this.inst.timer);
      this.inst.timer = 0;
    },
    startTimer() {
      this.stopTimer();
      if (!this.isOpen || !this.duration || this.duration <= 0) return;
      this.inst.timer = setTimeout(() => {
        this.inst.timer = 0;
        this.onClose?.();
      }, this.duration);
    },
  },
});
</script>