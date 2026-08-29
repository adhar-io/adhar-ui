// @ts-nocheck
<template>
  <div :data-state="props.open ? 'open' : 'closed'" :class="props.className">
    <slot />
  </div>
</template>

<script lang="ts">
export interface CollapsibleProps {
  open?: boolean;
  className?: string;
  children?: any;
}

export default defineComponent({
  name: "collapsible",

  props: ["open", "className"],
});
</script>