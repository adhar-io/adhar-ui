// @ts-nocheck
<script context="module" lang="ts">
  export interface AvatarProps {
    src?: string;
    alt?: string;
    fallback?: string;
    className?: string;
    imageClass?: string;
    fallbackClass?: string;
  }
</script>

<script lang="ts">
  export let alt: AvatarProps["alt"];
  export let className: AvatarProps["className"];
  export let fallbackClass: AvatarProps["fallbackClass"];
  export let fallback: AvatarProps["fallback"];
  export let src: AvatarProps["src"];
  export let imageClass: AvatarProps["imageClass"];
</script>

<span role="img" aria-label={alt} class={className}>
  {#if state.showImage}
    <img
      {src}
      alt={alt || ""}
      on:error={(event) => {
        state.handleError();
      }}
      class={imageClass}
    />
  {:else}
    <span aria-hidden="true" class={fallbackClass}>{fallback || "?"}</span>
  {/if}</span
>