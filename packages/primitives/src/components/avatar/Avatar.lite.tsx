import { useMetadata, useState } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  imageClass?: string;
  fallbackClass?: string;
}

export default function Avatar(props: AvatarProps) {
  const state = useState({
    imageError: false,
    handleError() {
      state.imageError = true;
    },
    get showImage() {
      return props.src && !state.imageError;
    },
  });

  return (
    <span className={props.className} role='img' aria-label={props.alt}>
      {state.showImage
        ? (
          <img
            className={props.imageClass}
            src={props.src}
            alt={props.alt || ''}
            onError={() => state.handleError()}
          />
        )
        : (
          <span className={props.fallbackClass} aria-hidden='true'>
            {props.fallback || '?'}
          </span>
        )}
    </span>
  );
}
