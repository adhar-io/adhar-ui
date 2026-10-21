// @ts-nocheck
import {
  Show,
  onMount,
  on,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";

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

import { cn } from "@adhar-ui/utils";
import {
  avatarFallbackVariants,
  avatarImageVariants,
  avatarVariants,
} from "./avatar.styles.ts";
import { initials } from "../_internal/dom.ts";

function Avatar(props: AvatarProps) {
  const [imageError, setImageError] = createSignal(false);

  const [imageLoaded, setImageLoaded] = createSignal(false);

  const [lastSrc, setLastSrc] = createSignal("");

  const showImage = createMemo(() => {
    return !!props.src && !imageError();
  });

  const fallbackText = createMemo(() => {
    return props.fallback || initials(props.alt) || "?";
  });

  const classes = createMemo(() => {
    return cn(
      avatarVariants({
        size: props.size,
        shape: props.shape,
      }),
      props.className
    );
  });

  const imageClasses = createMemo(() => {
    return cn(
      avatarImageVariants(),
      imageLoaded() ? "" : "invisible absolute inset-0",
      props.imageClass
    );
  });

  const fallbackClasses = createMemo(() => {
    return cn(
      avatarFallbackVariants({
        size: props.size,
      }),
      props.fallbackClass
    );
  });

  function handleLoad() {
    setImageLoaded(true);
  }

  function handleError() {
    setImageError(true);
  }

  let imgRef: HTMLImageElement;

  setLastSrc(props.src || "");

  onMount(() => {
    /* An image served from cache can finish before hydration attaches onLoad. */
    if (imgRef && imgRef.complete && imgRef.naturalWidth > 0)
      setImageLoaded(true);
  });

  const onUpdateFn_0_props_src = createMemo(() => props.src);
  function onUpdateFn_0() {
    /* Only reset when the source actually changes (this also runs on mount). */
    if ((props.src || "") === lastSrc()) return;
    setLastSrc(props.src || "");
    setImageError(false);
    setImageLoaded(false);
  }
  createEffect(on(() => [onUpdateFn_0_props_src()], onUpdateFn_0));

  return (
    <span
      class={classes()}
      role={showImage() && imageLoaded() ? undefined : "img"}
      aria-label={showImage() && imageLoaded() ? undefined : props.alt}
    >
      <Show when={showImage()}>
        <img
          class={imageClasses()}
          ref={imgRef!}
          src={props.src}
          alt={props.alt || ""}
          onLoad={(event) => handleLoad()}
          onError={(event) => handleError()}
        />
      </Show>
      <Show when={!imageLoaded()}>
        <span class={fallbackClasses()} aria-hidden="true">
          {fallbackText()}
        </span>
      </Show>
    </span>
  );
}

export default Avatar;
