<template>
  <div :data-state="isOpen ? 'open' : 'closed'" :class="rootClasses">
    <button
      type="button"
      aria-haspopup="menu"
      ref="triggerRef"
      :disabled="disabled"
      :aria-label="triggerLabel"
      :aria-expanded="isOpen"
      :aria-controls="isOpen ? menuId : undefined"
      :data-state="isOpen ? 'open' : 'closed'"
      @click="async (event) => setOpen(!isOpen, false)"
      @keydown="async (event) => handleTriggerKeyDown(event)"
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
        role="menu"
        aria-orientation="vertical"
        data-state="open"
        ref="contentRef"
        :id="menuId"
        :data-side="resolvedSide"
        :tabIndex="-1"
        @keydown="async (event) => handleContentKeyDown(event)"
        @click="async (event) => handleContentClick(event)"
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
import { dropdownMenuContentVariants } from "./dropdown-menu.styles.ts";
import { buttonVariants } from "../button/button.styles.ts";
import { placementVariants } from "../_internal/placement.styles.ts";
import { rovingFocus } from "../_internal/dom.ts";

export interface DropdownMenuProps {
  /** Controlled open state */
  open?: boolean;
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  /** Close the menu after an item is chosen (default true) */
  closeOnSelect?: boolean;
  /** Wrap arrow-key navigation from last to first item (default true) */
  loop?: boolean;
  disabled?: boolean;
  /** Prefix for the menu id, wired to the trigger’s aria-controls */
  id?: string;
  className?: string;
  /** Trigger classes. Defaults to an outline button. */
  triggerClass?: string;
  contentClass?: string;
  /** Accessible label for the trigger when its content is an icon */
  triggerLabel?: string;
  onOpenChange?: (open: boolean) => void;
  /** Content of the trigger button (text or icon — not another button) */
  trigger?: any;
  children?: any;
}

// WAI-ARIA menu button: Enter / Space / ArrowDown open the menu on the first
// item, ArrowUp on the last; arrows, Home and End move between items; Escape
// and Tab close it. Outside clicks hit a transparent backdrop.

export default defineComponent({
  name: "dropdown-menu",

  props: [
    "defaultOpen",
    "open",
    "side",
    "id",
    "className",
    "triggerClass",
    "align",
    "contentClass",
    "disabled",
    "onOpenChange",
    "loop",
    "closeOnSelect",
    "triggerLabel",
    "trigger",
  ],

  data() {
    return {
      internalOpen: false,
      inst: {
        focusLast: false,
      },
    };
  },

  created() {
    this.internalOpen = !!this.defaultOpen;
  },

  watch: {
    onUpdateHook0: {
      handler() {
        if (this.isOpen) {
          const last = this.inst.focusLast;
          this.inst.focusLast = false;
          setTimeout(() => this.focusItem(last));
        }
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
    menuId() {
      return this.id ? this.id + "-menu" : undefined;
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
          align: this.align || "start",
        }),
        dropdownMenuContentVariants(),
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
    focusItem(last: boolean) {
      if (!this.$refs.contentRef) return;
      const items = Array.from(
        this.$refs.contentRef.querySelectorAll(
          '[role="menuitem"]:not([aria-disabled="true"])'
        )
      ) as HTMLElement[];
      const target = last ? items[items.length - 1] : items[0];
      (target || this.$refs.contentRef).focus();
    },
    handleTriggerKeyDown(event: any) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        this.inst.focusLast = event.key === "ArrowUp";
        if (this.isOpen) this.focusItem(this.inst.focusLast);
        else this.setOpen(true, false);
      }
    },
    handleContentKeyDown(event: any) {
      if (event.key === "Escape") {
        event.stopPropagation();
        this.setOpen(false, true);
        return;
      }
      if (event.key === "Tab") {
        this.setOpen(false, false);
        return;
      }
      rovingFocus(event, this.$refs.contentRef, '[role="menuitem"]', {
        orientation: "vertical",
        loop: this.loop !== false,
      });
    },
    handleContentClick(event: any) {
      const item = event.target.closest
        ? event.target.closest('[role="menuitem"]')
        : null;
      if (!item || item.getAttribute("aria-disabled") === "true") return;
      if (this.closeOnSelect !== false) this.setOpen(false, true);
    },
  },
});
</script>