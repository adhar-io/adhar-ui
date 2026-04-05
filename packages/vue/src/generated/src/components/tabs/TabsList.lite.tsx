<template>
  <div role="tablist" :class="props.className"><slot /></div>
</template>

<script lang="ts">
export interface TabsListProps {
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "tabs-list",

  props: ["className"],
});
</script>