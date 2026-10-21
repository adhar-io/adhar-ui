<template>
  <div
    role="tabpanel"
    :id="id"
    :aria-labelledby="'aria-labelledby'"
    :data-value="value"
    :data-state="active ? 'active' : 'inactive'"
    :hidden="!active"
    :tabIndex="0"
    :class="classes"
  >
    <template v-if="active || forceMount">
      <slot />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import { tabsContentVariants } from "./tabs.styles.ts";

export interface TabsContentProps {
  value: string;
  active?: boolean;
  /** Keep inactive panels mounted (hidden) to preserve their state */
  forceMount?: boolean;
  className?: string;
  id?: string;
  /** ID of the TabsTrigger that labels this panel */
  "aria-labelledby"?: string;
  children?: any;
}

export default defineComponent({
  name: "tabs-content",

  props: ["className", "id", "value", "active", "forceMount"],

  computed: {
    classes() {
      return cn(tabsContentVariants(), this.className);
    },
  },
});
</script>