// @ts-nocheck
<template>
  <div
    role="separator"
    aria-orientation="horizontal"
    :class="props.className"
  ></div>
</template>

<script lang="ts">
export interface CommandSeparatorProps {
  className?: string;
}

export default defineComponent({
  name: "command-separator",

  props: ["className"],
});
</script>