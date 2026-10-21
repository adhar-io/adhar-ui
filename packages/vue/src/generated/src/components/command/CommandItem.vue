<template>
  <div
    role="option"
    :id="id"
    :tabIndex="-1"
    :aria-selected="selected ? true : false"
    :aria-disabled="disabled ? true : undefined"
    :data-selected="selected ? 'true' : 'false'"
    :data-disabled="disabled ? '' : undefined"
    :data-value="value"
    @click="async (event) => (disabled ? undefined : onSelect?.(value || ''))"
    @mouseenter="
      async (event) => (disabled ? undefined : onHighlight?.(value || ''))
    "
    :class="classes"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { commandItemVariants } from "./command.styles.ts";

export interface CommandItemProps {
  /** The value this item represents (passed to onSelect / onHighlightChange) */
  value?: string;
  /** Whether this item is the active/highlighted option */
  selected?: boolean;
  disabled?: boolean;
  /** Set an id to reference it from CommandInput `aria-activedescendant` */
  id?: string;
  className?: string;
  onSelect?: (value: string) => void;
  /** Fires on pointer hover, so mouse and keyboard share one highlight */
  onHighlight?: (value: string) => void;
  children?: any;
}

export default defineComponent({
  name: "command-item",

  props: [
    "className",
    "id",
    "selected",
    "disabled",
    "value",
    "onSelect",
    "onHighlight",
  ],

  computed: {
    classes() {
      return cn(commandItemVariants(), this.className);
    },
  },
});
</script>