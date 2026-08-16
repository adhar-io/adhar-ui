// @ts-nocheck
<template>
  <div
    role="separator"
    :aria-orientation="props.orientation || 'horizontal'"
    :class="props.className"
  ></div>
</template>

<script lang="ts">
export interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export default defineComponent({
  name: "separator",

  props: ["orientation", "className"],
});
</script>