// @ts-nocheck
<template>
  <div>
    <template v-if="props.open">
      <div
        @click="async (event) => state.handleOverlayClick(event)"
        @keydown="async (event) => state.handleKeyDown(event)"
        :class="props.overlayClass"
      >
        <div
          role="dialog"
          aria-modal="true"
          :data-side="props.side || 'right'"
          :tabIndex="-1"
          :class="props.contentClass"
        >
          <slot /><button
            type="button"
            aria-label="Close"
            @click="async (event) => props.onClose?.()"
            :style="{
              position: 'absolute',
              top: '16px',
              right: '16px',
            }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export interface SheetProps {
  open?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
  overlayClass?: string;
  contentClass?: string;
  onClose?: () => void;
  children?: any;
}

export default defineComponent({
  name: "sheet",

  props: ["open", "overlayClass", "side", "contentClass", "onClose"],
});
</script>