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
  dialogCloseVariants,
  dialogContentVariants,
  dialogOverlayVariants,
} from "./dialog.styles.ts";
import {
  focusInto,
  lockBodyScroll,
  trapTab,
  unlockBodyScroll,
} from "../_internal/dom.ts";

export interface DialogProps {
  /** Controlled open state */
  open?: boolean;
  /** Initial open state when uncontrolled */
  defaultOpen?: boolean;
  size?: "sm" | "default" | "lg" | "xl" | "full";
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
  /** ID of the DialogTitle — announced when the dialog opens */
  "aria-labelledby"?: string;
  /** ID of the DialogDescription */
  "aria-describedby"?: string;
  /** Label when there is no visible title */
  "aria-label"?: string;
  id?: string;
  className?: string;
  overlayClass?: string;
  /** Classes for the dialog panel (alias of className) */
  contentClass?: string;
  /** Fires when the dialog asks to close (Escape, backdrop, close button) */
  onClose?: () => void;
  /** Fires with the next open state */
  onOpenChange?: (open: boolean) => void;
  children?: any;
}

// Focus moves into the dialog on open (the first [data-autofocus] element, else
// the first focusable one) and returns to the previously focused element on
// close. Tab is trapped inside and page scroll is locked while open.

export default defineComponent({
  name: "dialog",

  props: [
    "defaultOpen",
    "open",
    "overlayClass",
    "size",
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
      return cn(dialogOverlayVariants(), this.overlayClass);
    },
    contentClasses() {
      return cn(
        dialogContentVariants({
          size: this.size,
        }),
        this.contentClass,
        this.className
      );
    },
    closeClasses() {
      return cn(dialogCloseVariants());
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