import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { skeletonVariants } from './skeleton.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-skeleton' },
});

export interface SkeletonProps {
  /** Preset shape: text line, heading, avatar circle, button, card, or image */
  variant?: 'default' | 'text' | 'heading' | 'avatar' | 'button' | 'card' | 'image';
  className?: string;
}

export default function Skeleton(props: SkeletonProps) {
  const state = useStore({
    get classes(): string {
      return cn(
        skeletonVariants({ variant: props.variant }),
        'motion-reduce:animate-none',
        props.className,
      );
    },
  });

  return <div className={state.classes} aria-hidden='true' />;
}
