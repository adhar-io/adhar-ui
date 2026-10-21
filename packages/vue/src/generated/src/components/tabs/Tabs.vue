<template>
  <div
    data-adhar-tabs=""
    ref="rootRef"
    :id="id"
    :data-active-tab="activeTab"
    :data-orientation="orientation || 'horizontal'"
    @click="async (event) => handleClick(event)"
    :class="className"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface TabsProps {
  /** The active tab’s value */
  value?: string;
  /** @deprecated Pass `value`; kept for data-active-tab on first render */
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  id?: string;
  /**
   * Fires with a tab’s value when the user activates it (click, or arrow keys
   * in TabsList). Lets the root own selection instead of every trigger’s onClick.
   */
  onValueChange?: (value: string) => void;
  /** Alias of `onValueChange` */
  onChange?: (value: string) => void;
  children?: any;
}

export default defineComponent({
  name: "tabs",

  props: [
    "value",
    "defaultValue",
    "onValueChange",
    "onChange",
    "id",
    "orientation",
    "className",
  ],

  computed: {
    activeTab() {
      return this.value || this.defaultValue || "";
    },
  },

  methods: {
    handleClick(event: any) {
      const tab = event.target.closest
        ? event.target.closest('[role="tab"]')
        : null;
      if (
        !tab ||
        tab.disabled ||
        !this.$refs.rootRef ||
        !this.$refs.rootRef.contains(tab)
      )
        return;
      /* Ignore tabs that belong to a nested Tabs. */
      if (tab.closest("[data-adhar-tabs]") !== this.$refs.rootRef) return;
      const value = tab.getAttribute("data-value") || "";
      if (value === this.activeTab) return;
      this.onValueChange?.(value);
      this.onChange?.(value);
    },
  },
});
</script>