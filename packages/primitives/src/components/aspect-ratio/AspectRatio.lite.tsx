import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface AspectRatioProps {
  /** CSS aspect-ratio value, e.g. "16 / 9", "1 / 1", "4 / 3" (default "16 / 9") */
  ratio?: string;
  className?: string;
  children?: any;
}

// Constrains its child to a fixed aspect ratio using the native CSS property.
export default function AspectRatio(props: AspectRatioProps) {
  return (
    <div
      className={props.className}
      style={{ aspectRatio: props.ratio || '16 / 9' }}
    >
      {props.children}
    </div>
  );
}
