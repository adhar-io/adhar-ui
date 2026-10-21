<template>
  <button
    type="button"
    role="tab"
    :id="id"
    :aria-selected="active ? true : false"
    :aria-controls="'aria-controls'"
    :disabled="disabled"
    :tabIndex="active ? 0 : -1"
    :data-value="value"
    :data-state="active ? 'active' : 'inactive'"
    @click="async (event) => onClick?.(value)"
    :class="classes"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { tabsTriggerVariants } from "./tabs.styles.ts";

export interface TabsTriggerProps {
  value: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  /** Give the trigger an id and pass it to TabsContent `aria-labelledby` */
  id?: string;
  /** ID of the TabsContent this trigger shows */
  "aria-controls"?: string;
  onClick?: (value: string) => void;
  children?: any;
}

export default defineComponent({
  name: "tabs-trigger",

  props: ["className", "id", "active", "disabled", "value", "onClick"],

  computed: {
    classes() {
      return cn(tabsTriggerVariants(), this.className);
    },
  },
});
</script>