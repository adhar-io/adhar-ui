<template>
  <div
    role="tabpanel"
    :data-value="props.value"
    :hidden="!props.active"
    :tabIndex="0"
    :class="props.className"
  >
    <template v-if="props.active">
      <slot />
    </template>
  </div>
</template>

<script lang="ts">
export interface TabsContentProps {
  value: string;
  active?: boolean;
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "tabs-content",

  props: ["value", "active", "className"],
});
</script>