<template>
  <span
    :role="showImage && imageLoaded ? undefined : 'img'"
    :aria-label="showImage && imageLoaded ? undefined : alt"
    :class="classes"
  >
    <template v-if="showImage">
      <img
        ref="imgRef"
        :src="src"
        :alt="alt || ''"
        @load="async (event) => handleLoad()"
        @error="async (event) => handleError()"
        :class="imageClasses"
      />
    </template>

    <template v-if="!imageLoaded">
      <span aria-hidden="true" :class="fallbackClasses">{{
        fallbackText
      }}</span>
    </template>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { cn } from "@adhar-ui/utils";
import {
  avatarFallbackVariants,
  avatarImageVariants,
  avatarVariants,
} from "./avatar.styles.ts";
import { initials } from "../_internal/dom.ts";

export interface AvatarProps {
  src?: string;
  /** Person’s name / image description. Also used to derive fallback initials. */
  alt?: string;
  /** Fallback content while loading or when the image fails (default: initials from `alt`) */
  fallback?: string;
  size?: "xs" | "sm" | "default" | "lg" | "xl";
  shape?: "circle" | "square";
  className?: string;
  imageClass?: string;
  fallbackClass?: string;
}

export default defineComponent({
  name: "avatar",

  props: [
    "src",
    "fallback",
    "alt",
    "size",
    "shape",
    "className",
    "imageClass",
    "fallbackClass",
  ],

  data() {
    return { imageError: false, imageLoaded: false, lastSrc: "" };
  },

  created() {
    this.lastSrc = this.src || "";
  },
  mounted() {
    /* An image served from cache can finish before hydration attaches onLoad. */
    if (
      this.$refs.imgRef &&
      this.$refs.imgRef.complete &&
      this.$refs.imgRef.naturalWidth > 0
    )
      this.imageLoaded = true;
  },

  watch: {
    onUpdateHook0: {
      handler() {
        /* Only reset when the source actually changes (this also runs on mount). */
        if ((this.src || "") === this.lastSrc) return;
        this.lastSrc = this.src || "";
        this.imageError = false;
        this.imageLoaded = false;
      },
      immediate: true,
    },
  },

  computed: {
    showImage() {
      return !!this.src && !this.imageError;
    },
    fallbackText() {
      return this.fallback || initials(this.alt) || "?";
    },
    classes() {
      return cn(
        avatarVariants({
          size: this.size,
          shape: this.shape,
        }),
        this.className
      );
    },
    imageClasses() {
      return cn(
        avatarImageVariants(),
        this.imageLoaded ? "" : "invisible absolute inset-0",
        this.imageClass
      );
    },
    fallbackClasses() {
      return cn(
        avatarFallbackVariants({
          size: this.size,
        }),
        this.fallbackClass
      );
    },
    onUpdateHook0() {
      return {
        0: this.src,
      };
    },
  },

  methods: {
    handleLoad() {
      this.imageLoaded = true;
    },
    handleError() {
      this.imageError = true;
    },
  },
});
</script>