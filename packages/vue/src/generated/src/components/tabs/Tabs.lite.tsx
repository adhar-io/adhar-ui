<template>
  <div :data-active-tab="state.activeTab" :class="props.className">
    <slot />
  </div>
</template>

<script lang="ts">
export interface TabsProps {
  defaultValue?: string;
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
  children?: any;
}

export default defineComponent({
  name: "tabs",

  props: ["className"],
});
</script>