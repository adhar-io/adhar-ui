// @ts-nocheck
import { Show } from 'solid-js';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  imageClass?: string;
  fallbackClass?: string;
}

function Avatar(props: AvatarProps) {
  return (
    <span class={props.className} role='img' aria-label={props.alt}>
      <Show
        fallback={
          <span class={props.fallbackClass} aria-hidden='true'>
            {props.fallback || '?'}
          </span>
        }
        when={showImage}
      >
        <img
          class={props.imageClass}
          src={props.src}
          alt={props.alt || ''}
          onError={(event) => handleError()}
        />
      </Show>
    </span>
  );
}

export default Avatar;
