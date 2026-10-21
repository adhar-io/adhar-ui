<template>
  <div
    ref="rootRef"
    :data-state="isOpen ? 'open' : 'closed'"
    @keydown="async (event) => handleKeyDown(event)"
    @focusout="async (event) => handleFocusOut(event)"
    :class="rootClasses"
  >
    <button
      type="button"
      aria-haspopup="dialog"
      ref="triggerRef"
      :disabled="disabled"
      :aria-label="triggerLabel"
      :aria-expanded="isOpen"
      :aria-controls="isOpen ? contentId : undefined"
      :data-state="isOpen ? 'open' : 'closed'"
      @click="async (event) => setOpen(!isOpen, false)"
      :class="triggerClasses"
    >
      {{ trigger }}
    </button>
    <template v-if="isOpen">
      <div
        aria-hidden="true"
        class="fixed inset-0 z-40"
        @click="async (event) => setOpen(false, true)"
      ></div>
      <div
        role="dialog"
        data-state="open"
        ref="contentRef"
        :id="contentId"
        :aria-label="'aria-label'"
        :data-side="resolvedSide"
        :tabIndex="-1"
        :class="contentClasses"
      >
        <slot />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { popoverContentVariants } from "./popover.styles.ts";
import { buttonVariants } from "../button/button.styles.ts";
import { placementVariants } from "../_internal/placement.styles.ts";
import { focusInto } from "../_internal/dom.ts";

export interface PopoverProps {
  /** Controlled open state */
  open?: boolean;
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  /** Move focus into the content on open (default true) */
  autoFocus?: boolean;
  disabled?: boolean;
  /** Prefix for the content id, wired to the trigger’s aria-controls */
  id?: string;
  className?: string;
  /** Trigger classes. Defaults to an outline button. */
  triggerClass?: string;
  contentClass?: string;
  /** Accessible label for the trigger when its content is an icon */
  triggerLabel?: string;
  /** Accessible label for the popover panel */
  "aria-label"?: string;
  onOpenChange?: (open: boolean) => void;
  /** Content of the trigger button (text or icon — not another button) */
  trigger?: any;
  children?: any;
}

// Closes on Escape, on a click outside (via a transparent backdrop, so it needs
// no document listeners), and when focus tabs out of the popover.

export default defineComponent({
  name: "popover",

  props: [
    "defaultOpen",
    "autoFocus",
    "open",
    "side",
    "id",
    "className",
    "triggerClass",
    "align",
    "contentClass",
    "disabled",
    "onOpenChange",
    "triggerLabel",
    "trigger",
  ],

  data() {
    return { internalOpen: false };
  },

  created() {
    this.internalOpen = !!this.defaultOpen;
  },

  watch: {
    onUpdateHook0: {
      handler() {
        if (this.isOpen && this.autoFocus !== false)
          setTimeout(() => focusInto(this.$refs.contentRef));
      },
      immediate: true,
    },
  },

  computed: {
    isOpen() {
      return this.open !== undefined ? !!this.open : this.internalOpen;
    },
    resolvedSide() {
      return this.side || "bottom";
    },
    contentId() {
      return this.id ? this.id + "-content" : undefined;
    },
    rootClasses() {
      return cn("relative inline-block", this.className);
    },
    triggerClasses() {
      return this.triggerClass === undefined
        ? buttonVariants({
            variant: "outline",
          })
        : this.triggerClass;
    },
    contentClasses() {
      return cn(
        placementVariants({
          side: this.resolvedSide,
          align: this.align,
        }),
        popoverContentVariants(),
        this.contentClass
      );
    },
    onUpdateHook0() {
      return {
        0: this.isOpen,
      };
    },
  },

  methods: {
    setOpen(next: boolean, restoreFocus: boolean) {
      if (next && this.disabled) return;
      this.internalOpen = next;
      this.onOpenChange?.(next);
      if (!next && restoreFocus && this.$refs.triggerRef)
        this.$refs.triggerRef.focus();
    },
    handleKeyDown(event: any) {
      if (event.key === "Escape" && this.isOpen) {
        event.stopPropagation();
        this.setOpen(false, true);
      }
    },
    handleFocusOut(event: any) {
      const next = event.relatedTarget;
      if (
        this.isOpen &&
        next &&
        this.$refs.rootRef &&
        !this.$refs.rootRef.contains(next)
      )
        this.setOpen(false, false);
    },
  },
});
</script>