import {
  onInit,
  onMount,
  onUpdate,
  Show,
  useMetadata,
  useRef,
  useStore,
} from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { avatarFallbackVariants, avatarImageVariants, avatarVariants } from './avatar.styles.ts';
import { initials } from '../_internal/dom.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-avatar' },
});

export interface AvatarProps {
  src?: string;
  /** Person’s name / image description. Also used to derive fallback initials. */
  alt?: string;
  /** Fallback content while loading or when the image fails (default: initials from `alt`) */
  fallback?: string;
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  className?: string;
  imageClass?: string;
  fallbackClass?: string;
}

export default function Avatar(props: AvatarProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  const state = useStore({
    imageError: false,
    imageLoaded: false,
    lastSrc: '',
    get showImage(): boolean {
      return !!props.src && !state.imageError;
    },
    get fallbackText(): string {
      return props.fallback || initials(props.alt) || '?';
    },
    get classes(): string {
      return cn(avatarVariants({ size: props.size, shape: props.shape }), props.className);
    },
    get imageClasses(): string {
      return cn(
        avatarImageVariants(),
        state.imageLoaded ? '' : 'invisible absolute inset-0',
        props.imageClass,
      );
    },
    get fallbackClasses(): string {
      return cn(avatarFallbackVariants({ size: props.size }), props.fallbackClass);
    },
    handleLoad() {
      state.imageLoaded = true;
    },
    handleError() {
      state.imageError = true;
    },
  });

  onInit(() => {
    state.lastSrc = props.src || '';
  });

  onMount(() => {
    /* An image served from cache can finish before hydration attaches onLoad. */
    if (imgRef && imgRef.complete && imgRef.naturalWidth > 0) state.imageLoaded = true;
  });

  onUpdate(() => {
    /* Only reset when the source actually changes (this also runs on mount). */
    if ((props.src || '') === state.lastSrc) return;
    state.lastSrc = props.src || '';
    state.imageError = false;
    state.imageLoaded = false;
  }, [props.src]);

  return (
    <span
      className={state.classes}
      role={state.showImage && state.imageLoaded ? undefined : 'img'}
      aria-label={state.showImage && state.imageLoaded ? undefined : props.alt}
    >
      <Show when={state.showImage}>
        <img
          ref={imgRef}
          className={state.imageClasses}
          src={props.src}
          alt={props.alt || ''}
          onLoad={() => state.handleLoad()}
          onError={() => state.handleError()}
        />
      </Show>
      <Show when={!state.imageLoaded}>
        <span className={state.fallbackClasses} aria-hidden='true'>
          {state.fallbackText}
        </span>
      </Show>
    </span>
  );
}
