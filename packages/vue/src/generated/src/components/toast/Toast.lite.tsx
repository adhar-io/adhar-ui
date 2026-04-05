<template>
  <div>
    <template v-if="state.isOpen">
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        :class="props.className"
      >
        <div>
          <template v-if="props.title">
            <div :class="props.titleClass">{{ props.title }}</div>
          </template>

          <template v-if="props.description">
            <div :class="props.descriptionClass">{{ props.description }}</div>
          </template>

          <slot />
        </div>
        <button
          type="button"
          aria-label="Close"
          @click="async (event) => props.onClose?.()"
          :class="props.closeClass"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
export interface ToastProps {
  open?: boolean;
  variant?: "default" | "destructive" | "success";
  className?: string;
  titleClass?: string;
  descriptionClass?: string;
  closeClass?: string;
  title?: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
  children?: any;
}

export default defineComponent({
  name: "toast",

  props: [
    "className",
    "title",
    "titleClass",
    "description",
    "descriptionClass",
    "onClose",
    "closeClass",
  ],
});
</script>