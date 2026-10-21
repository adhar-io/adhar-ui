<template>
  <div
    :data-state="open ? 'open' : 'closed'"
    :data-disabled="disabled ? '' : undefined"
    :class="className"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface CollapsibleProps {
  open?: boolean;
  disabled?: boolean;
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "collapsible",

  props: ["open", "disabled", "className"],
});
</script>