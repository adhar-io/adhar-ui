import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { scrollAreaVariants } from './scroll-area.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-scroll-area' },
});

export interface ScrollAreaProps {
  orientation?: 'vertical' | 'horizontal' | 'both';
  /** Max height of the scroll viewport, e.g. "20rem" or 320 (px) */
  maxHeight?: string | number;
  className?: string;
  /** Adds tabindex so keyboard users can scroll the region. Requires `aria-label`. */
  focusable?: boolean;
  'aria-label'?: string;
  children?: any;
}

export default function ScrollArea(props: ScrollAreaProps) {
  const state = useStore({
    get classes(): string {
      return cn(
        scrollAreaVariants({ orientation: props.orientation }),
        props.focusable
          ? 'rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          : '',
        props.className,
      );
    },
    get maxHeightValue(): string | undefined {
      if (props.maxHeight === undefined || props.maxHeight === null) return undefined;
      return typeof props.maxHeight === 'number' ? props.maxHeight + 'px' : props.maxHeight;
    },
  });

  return (
    <div
      className={state.classes}
      style={{ maxHeight: state.maxHeightValue }}
      tabIndex={props.focusable ? 0 : undefined}
      role={props.focusable ? 'region' : undefined}
      aria-label={props['aria-label']}
      data-orientation={props.orientation || 'vertical'}
    >
      {props.children}
    </div>
  );
}
