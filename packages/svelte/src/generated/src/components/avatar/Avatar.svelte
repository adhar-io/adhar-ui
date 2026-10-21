<script context="module" lang="ts">
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
</script>

<script lang="ts">
  import { onMount } from "svelte";

  import { cn } from "@adhar-ui/utils";
  import {
    avatarFallbackVariants,
    avatarImageVariants,
    avatarVariants,
  } from "./avatar.styles.ts";
  import { initials } from "../_internal/dom.ts";

  export let src: AvatarProps["src"] = undefined;
  export let fallback: AvatarProps["fallback"] = undefined;
  export let alt: AvatarProps["alt"] = undefined;
  export let size: AvatarProps["size"] = undefined;
  export let shape: AvatarProps["shape"] = undefined;
  export let className: AvatarProps["className"] = undefined;
  export let imageClass: AvatarProps["imageClass"] = undefined;
  export let fallbackClass: AvatarProps["fallbackClass"] = undefined;

  function handleLoad() {
    imageLoaded = true;
  }
  function handleError() {
    imageError = true;
  }
  $: showImage = () => {
    return !!src && !imageError;
  };
  $: fallbackText = () => {
    return fallback || initials(alt) || "?";
  };
  $: classes = () => {
    return cn(
      avatarVariants({
        size: size,
        shape: shape,
      }),
      className
    );
  };
  $: imageClasses = () => {
    return cn(
      avatarImageVariants(),
      imageLoaded ? "" : "invisible absolute inset-0",
      imageClass
    );
  };
  $: fallbackClasses = () => {
    return cn(
      avatarFallbackVariants({
        size: size,
      }),
      fallbackClass
    );
  };

  let imgRef;

  let imageError = false;
  let imageLoaded = false;
  let lastSrc = "";
  lastSrc = src || "";

  onMount(() => {
    /* An image served from cache can finish before hydration attaches onLoad. */
    if (imgRef && imgRef.complete && imgRef.naturalWidth > 0)
      imageLoaded = true;
  });

  function onUpdateFn_0(..._args: any[]) {
    /* Only reset when the source actually changes (this also runs on mount). */
    if ((src || "") === lastSrc) return;
    lastSrc = src || "";
    imageError = false;
    imageLoaded = false;
  }

  $: onUpdateFn_0(...[src]);
</script>

<span
  role={showImage() && imageLoaded ? undefined : "img"}
  aria-label={showImage() && imageLoaded ? undefined : alt}
  class={classes()}
>
  {#if showImage()}
    <img
      bind:this={imgRef}
      {src}
      alt={alt || ""}
      on:load={(event) => {
        handleLoad();
      }}
      on:error={(event) => {
        handleError();
      }}
      class={imageClasses()}
    />
  {/if}
  {#if !imageLoaded}
    <span aria-hidden="true" class={fallbackClasses()}>{fallbackText()}</span>
  {/if}</span
>