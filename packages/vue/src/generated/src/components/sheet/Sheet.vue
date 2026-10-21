<template>
  <template v-if="isOpen">
    <div
      data-state="open"
      @click="async (event) => handleOverlayClick(event)"
      @keydown="async (event) => handleKeyDown(event)"
      :class="overlayClasses"
    >
      <div
        aria-modal="true"
        data-state="open"
        ref="contentRef"
        :id="id"
        :role="role || 'dialog'"
        :aria-labelledby="'aria-labelledby'"
        :aria-describedby="'aria-describedby'"
        :aria-label="'aria-label'"
        :data-side="side || 'right'"
        :tabIndex="-1"
        :class="contentClasses"
      >
        <slot />
        <template v-if="showClose !== false">
          <button
            type="button"
            :aria-label="closeLabel || 'Close'"
            @click="async (event) => requestClose()"
            :class="closeClasses"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import {
  sheetCloseVariants,
  sheetContentVariants,
  sheetOverlayVariants,
} from "./sheet.styles.ts";
import {
  focusInto,
  lockBodyScroll,
  trapTab,
  unlockBodyScroll,
} from "../_internal/dom.ts";

export interface SheetProps {
  /** Controlled open state */
  open?: boolean;
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean;
  /** Edge the panel slides in from (default "right") */
  side?: "top" | "right" | "bottom" | "left";
  /** "alertdialog" for confirmations that need an explicit choice */
  role?: "dialog" | "alertdialog";
  /** Close when the backdrop is clicked (default true) */
  closeOnOverlayClick?: boolean;
  /** Close on Escape (default true) */
  closeOnEscape?: boolean;
  /** Render the top-right close button (default true) */
  showClose?: boolean;
  /** Accessible label for the close button (default "Close") */
  closeLabel?: string;
  /** ID of the sheet’s title — announced when the dialog opens */
  "aria-labelledby"?: string;
  /** ID of the sheet’s description */
  "aria-describedby"?: string;
  /** Label when there is no visible title */
  "aria-label"?: string;
  id?: string;
  className?: string;
  overlayClass?: string;
  /** Classes for the sheet panel (alias of className) */
  contentClass?: string;
  /** Fires when the sheet asks to close (Escape, backdrop, close button) */
  onClose?: () => void;
  /** Fires with the next open state */
  onOpenChange?: (open: boolean) => void;
  children?: any;
}

// A dialog anchored to a screen edge. Same focus, Escape and scroll-lock
// behaviour as Dialog.

export default defineComponent({
  name: "sheet",

  props: [
    "defaultOpen",
    "open",
    "overlayClass",
    "side",
    "contentClass",
    "className",
    "onClose",
    "onOpenChange",
    "closeOnOverlayClick",
    "closeOnEscape",
    "id",
    "role",
    "showClose",
    "closeLabel",
  ],

  data() {
    return {
      internalOpen: false,
      inst: {
        wasOpen: false,
        restoreTo: null as HTMLElement | null,
      },
    };
  },

  created() {
    this.internalOpen = !!this.defaultOpen;
  },

  watch: {
    onUpdateHook0: {
      handler() {
        this.syncOpen();
      },
      immediate: true,
    },
  },
  unmounted() {
    if (this.inst.wasOpen) {
      this.inst.wasOpen = false;
      unlockBodyScroll();
    }
  },

  computed: {
    isOpen() {
      return this.open !== undefined ? !!this.open : this.internalOpen;
    },
    overlayClasses() {
      return cn(sheetOverlayVariants(), this.overlayClass);
    },
    contentClasses() {
      return cn(
        sheetContentVariants({
          side: this.side,
        }),
        this.contentClass,
        this.className
      );
    },
    closeClasses() {
      return cn(sheetCloseVariants());
    },
    onUpdateHook0() {
      return {
        0: this.isOpen,
      };
    },
  },

  methods: {
    requestClose() {
      this.internalOpen = false;
      this.onClose?.();
      this.onOpenChange?.(false);
    },
    handleOverlayClick(event: any) {
      if (
        event.target === event.currentTarget &&
        this.closeOnOverlayClick !== false
      ) {
        this.requestClose();
      }
    },
    handleKeyDown(event: any) {
      if (event.key === "Escape" && this.closeOnEscape !== false) {
        event.stopPropagation();
        this.requestClose();
        return;
      }
      trapTab(event, this.$refs.contentRef);
    },
    syncOpen() {
      if (typeof document === "undefined") return;
      if (this.isOpen && !this.inst.wasOpen) {
        this.inst.wasOpen = true;
        this.inst.restoreTo = document.activeElement as HTMLElement;
        lockBodyScroll();
        setTimeout(() => focusInto(this.$refs.contentRef));
      } else if (!this.isOpen && this.inst.wasOpen) {
        this.inst.wasOpen = false;
        unlockBodyScroll();
        const target = this.inst.restoreTo;
        this.inst.restoreTo = null;
        if (target && target.focus) setTimeout(() => target.focus());
      }
    },
  },
});
</script>