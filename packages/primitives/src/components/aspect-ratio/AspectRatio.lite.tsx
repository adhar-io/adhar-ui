import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { aspectRatioVariants } from './aspect-ratio.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-aspect-ratio' },
});

export interface AspectRatioProps {
  /** Width / height. A number (16 / 9) or a CSS value ("16 / 9"). Default 16 / 9. */
  ratio?: number | string;
  className?: string;
  children?: any;
}

// Constrains its child to a fixed aspect ratio using the native CSS property.
export default function AspectRatio(props: AspectRatioProps) {
  const state = useStore({
    get classes(): string {
      return cn(aspectRatioVariants(), props.className);
    },
    get ratioValue(): string {
      return props.ratio === undefined || props.ratio === null ? '16 / 9' : String(props.ratio);
    },
  });

  return (
    <div className={state.classes} style={{ aspectRatio: state.ratioValue }}>
      {props.children}
    </div>
  );
}
