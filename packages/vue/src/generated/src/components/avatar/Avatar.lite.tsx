// @ts-nocheck
<template>
  <span role="img" :aria-label="props.alt" :class="props.className">
    <template v-if="state.showImage">
      <img
        :src="props.src"
        :alt="props.alt || ''"
        @error="async (event) => state.handleError()"
        :class="props.imageClass"
      />
    </template>

    <template v-else>
      <span aria-hidden="true" :class="props.fallbackClass">{{
        props.fallback || "?"
      }}</span>
    </template>
  </span>
</template>

<script lang="ts">
export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  imageClass?: string;
  fallbackClass?: string;
}

export default defineComponent({
  name: "avatar",

  props: ["alt", "className", "fallbackClass", "fallback", "src", "imageClass"],
});
</script>