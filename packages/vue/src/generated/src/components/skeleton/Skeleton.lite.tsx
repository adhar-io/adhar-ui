<template>
  <div aria-hidden="true" role="presentation" :class="props.className"></div>
</template>

<script lang="ts">
export interface SkeletonProps {
  className?: string;
}

export default defineComponent({
  name: "skeleton",

  props: ["className"],
});
</script>