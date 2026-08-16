// @ts-nocheck
<template>
  <div role="separator" :class="props.className"></div>
</template>

<script lang="ts">
export interface DropdownMenuSeparatorProps {
  className?: string;
}

export default defineComponent({
  name: "dropdown-menu-separator",

  props: ["className"],
});
</script>