"use client";
import * as React from "react";
import { useState, useRef, useEffect } from "react";

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
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageError, setImageError] = useState(() => false);

  const [imageLoaded, setImageLoaded] = useState(() => false);

  const [lastSrc, setLastSrc] = useState(() => "");

  function showImage() {
    return !!props.src && !imageError;
  }

  function fallbackText() {
    return props.fallback || initials(props.alt) || "?";
  }

  function classes() {
    return cn(
      avatarVariants({
        size: props.size,
        shape: props.shape,
      }),
      props.className
    );
  }

  function imageClasses() {
    return cn(
      avatarImageVariants(),
      imageLoaded ? "" : "invisible absolute inset-0",
      props.imageClass
    );
  }

  function fallbackClasses() {
    return cn(
      avatarFallbackVariants({
        size: props.size,
      }),
      props.fallbackClass
    );
  }

  function handleLoad() {
    setImageLoaded(true);
  }

  function handleError() {
    setImageError(true);
  }

  const hasInitialized = useRef(false);
  if (!hasInitialized.current) {
    setLastSrc(props.src || "");
    hasInitialized.current = true;
  }

  useEffect(() => {
    /* An image served from cache can finish before hydration attaches onLoad. */
    if (
      imgRef.current &&
      imgRef.current.complete &&
      imgRef.current.naturalWidth > 0
    )
      setImageLoaded(true);
  }, []);
  useEffect(() => {
    /* Only reset when the source actually changes (this also runs on mount). */
    if ((props.src || "") === lastSrc) return;
    setLastSrc(props.src || "");
    setImageError(false);
    setImageLoaded(false);
  }, [props.src]);

  return (
    <span
      role={showImage() && imageLoaded ? undefined : "img"}
      aria-label={showImage() && imageLoaded ? undefined : props.alt}
      className={classes()}
    >
      {showImage() ? (
        <img
          ref={imgRef}
          src={props.src}
          alt={props.alt || ""}
          onLoad={(event) => handleLoad()}
          onError={(event) => handleError()}
          className={imageClasses()}
        />
      ) : null}
      {!imageLoaded ? (
        <span aria-hidden="true" className={fallbackClasses()}>
          {fallbackText()}
        </span>
      ) : null}
    </span>
  );
}

export default Avatar;
