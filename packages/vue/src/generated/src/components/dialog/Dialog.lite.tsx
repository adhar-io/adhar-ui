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
          :tabIndex="-1"
          :class="props.contentClass"
        >
          <slot />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export interface DialogProps {
  open?: boolean;
  className?: string;
  overlayClass?: string;
  contentClass?: string;
  onClose?: () => void;
  children?: any;
}

export default defineComponent({
  name: "dialog",

  props: ["open", "overlayClass", "contentClass"],
});
</script>