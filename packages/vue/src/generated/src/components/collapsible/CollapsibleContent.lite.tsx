// @ts-nocheck
<template>
  <div
    :id="props.id"
    :data-state="props.open ? 'open' : 'closed'"
    :aria-hidden="props.open ? false : true"
    :class="props.className"
  >
    <div :class="props.innerClass"><slot /></div>
  </div>
</template>

<script lang="ts">
export interface CollapsibleContentProps {
  open?: boolean;
  id?: string;
  className?: string;
  /** Class for the required inner overflow-hidden wrapper */
  innerClass?: string;
  children?: any;
}

export default defineComponent({
  name: "collapsible-content",

  props: ["id", "open", "className", "innerClass"],
});
</script>